<?php

declare(strict_types=1);
namespace Dam\Core\Preview;


use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Entities\Attachment;
use Espo\Core\Exceptions\Error;
use Gumlet\ImageResize;
use Treo\Core\Container;

abstract class Base
{
    protected $attachment;
    protected $size;
    protected $container;

    const MAPPING = [
        "application/pdf" => Pdf::class,
        "image/gif" => Image::class,
        "image/jpeg" => Image::class,
        "image/png" => Image::class
    ];

    /**
     * @var
     */
    protected $imageSizes;

    public function __construct(Attachment $attachment, string $size, Container $container)
    {
        $this->attachment = $attachment;
        $this->size = $size;
        $this->container = $container;

        $this->imageSizes = $this->getMetadata()->get(['app', 'imageSizes']);
    }

    public static function init(Attachment $attachment, string $size, Container $container)
    {
        $mime = $attachment->get('type');
        $className = self::MAPPING[$mime] ?? "Dam\Core\Preview\File";

        return (new $className($attachment, $size, $container))->show();
    }

    /**
     * @param Attachment $attachment
     * @param            $size
     * @return string
     */
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

    protected function getMetadata()
    {
        return $this->container->get('metadata');
    }

    protected function getEntityManager ()
    {
        return $this->container->get('entityManager');
    }

    protected function getFileManager ()
    {
        return $this->container->get('fileManager');
    }

    abstract public function show();
}