<?php


namespace Dam\Core\Preview;


use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\Exceptions\Error;
use Espo\Core\Exceptions\NotFound;
use Gumlet\ImageResize;
use Treo\Core\Container;
use Treo\Entities\Attachment;

class Image extends Base
{
    protected $imageSizes;

    public function __construct(\Dam\Entities\Attachment $attachment, string $size, Container $container)
    {
        parent::__construct($attachment, $size, $container);
        $this->imageSizes = $this->getMetadata()->get(['app', 'imageSizes']);
    }

    public function show()
    {
        $filePath = $this->getEntityManager()->getRepository('Attachment')->getFilePath($this->attachment);

        $fileType = $this->attachment->get('type');

        if (!file_exists($filePath)) {
            throw new NotFound();
        }

        if (!empty($this->size)) {
            if (!empty($this->imageSizes[$this->size])) {
                $thumbFilePath = $this->buildPath($this->attachment, $this->size);

                if (!file_exists($thumbFilePath)) {
                    $thumbFilePath = $this->createThumb($thumbFilePath, $filePath, $this->size);
                }
                $filePath = $thumbFilePath;

            } elseif ($this->size === "original") {

            } else {
                throw new Error();
            }
        }

        $fileName = $this->attachment->get('name');

        header('Content-Disposition:inline;filename="' . $fileName . '"');
        if (!empty($fileType)) {
            header('Content-Type: ' . ($fileType === "application/pdf" ? "image/png" : $fileType));
        }
        header('Pragma: public');
        header('Cache-Control: max-age=360000, must-revalidate');
        $fileSize = filesize($filePath);
        if ($fileSize) {
            header('Content-Length: ' . $fileSize);
        }
        readfile($filePath);
        exit;
    }

    protected function buildPath(Attachment $attachment, $size)
    {
        if ($attachment->get('relatedType') === "Asset") {
            $asset = $attachment->get('related');
            if ($asset) {
                $isPrivate = $asset->get('private');
            }
        }

        $path = isset($isPrivate) ? DAMUploadDir::DAM_THUMB_PATH : DAMUploadDir::BASE_THUMB_PATH;

        return $path . $attachment->get('storageFilePath') . "/{$size}/" . $attachment->get('name');
    }

    /**
     * @param $thumbFilePath
     * @param $filePath
     * @param $size
     * @return mixed
     * @throws Error
     * @throws \Gumlet\ImageResizeException
     */
    protected function createThumb($thumbFilePath, $filePath, $size)
    {
        $image = new ImageResize($filePath);

        if (!$this->imageSizes[$size]) {
            throw new Error();
        }

        list($w, $h) = $this->imageSizes[$size];

        $image->resizeToBestFit($w, $h);

        if ($this->getFileManager()->putContents($thumbFilePath, $image->getImageAsString())) {
            return $thumbFilePath;
        }

        return false;
    }
}