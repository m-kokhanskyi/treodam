<?php


namespace Dam\EntryPoints;


use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;
use Imagick;

class Download extends \Espo\EntryPoints\Download
{
    /**@var Imagick * */
    protected $image = null;

    public function run()
    {
        switch ($_GET['type']) {
            case "custom" :
                $this->custom();
                break;
            default:
                parent::run();
        }
    }

    protected function custom()
    {
        $attachment = $this->getAttachment();

        $filePath = $this->getEntityManager()->getRepository('Attachment')->getFilePath($attachment);

        if (!file_exists($filePath)) {
            throw new NotFound();
        }

        $file = $this->initRun($filePath)->resize()->quality();

        $outputFileName = $attachment->get('name');
        $outputFileName = str_replace("\"", "\\\"", $outputFileName);

        $type = $attachment->get('type');

        $disposition = 'attachment';
        if (in_array($type, $this->fileTypesToShowInline)) {
            $disposition = 'inline';
        }

        header('Content-Description: File Transfer');
        if ($type) {
            header('Content-Type: ' . $type);
        }
        header("Content-Disposition: " . $disposition . ";filename=\"" . $outputFileName . "\"");
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($filePath));

        readfile($file->getImage());
        exit;
    }

    protected function getAttachment()
    {
        if (empty($_GET['id'])) {
            throw new BadRequest();
        }
        $id = $_GET['id'];

        $attachment = $this->getEntityManager()->getEntity('Attachment', $id);

        if (!$attachment) {
            throw new NotFound();
        }

        if (!$this->getAcl()->checkEntity($attachment)) {
            throw new Forbidden();
        }

        return $attachment;
    }

    protected function initRun($fileName)
    {
        $this->image = new \Imagick($fileName);

        return $this;
    }

    protected function resize()
    {
        switch ($_GET['scale']) {
            case "resize":
                $this->image->resizeImage((int)$_GET['width'], (int)$_GET['height'], Imagick::FILTER_HAMMING, 1, false);
                break;
            case "byWidth":
                $this->image->resizeImage((int)$_GET['width'], 1000000000, Imagick::FILTER_HAMMING, 1, true);
                break;
            case "byHeight" :
                $this->image->resizeImage(1000000000, (int)$_GET['height'], Imagick::FILTER_HAMMING, 1, true);
                break;
        }

        return $this;
    }

    protected function quality()
    {
        //$this->image->setImageCompressionQuality((int)$_GET['quality']);

        return $this;
    }

    protected function getImage()
    {
        $string_temp = tempnam(sys_get_temp_dir(), '');

        //$this->image->setImageFormat($_GET['format']);

        $this->image->writeImage($string_temp);

        return $string_temp;
    }

}