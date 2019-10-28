<?php


namespace Dam\EntryPoints;


use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;
use Imagick;

class Download extends \Espo\EntryPoints\Download
{
    /**@var Imagick **/
    protected $image = null;

    public function run()
    {
        if ($_GET['type'] === "custom") {

            $attachment = $this->getAttachment();

            $filePath = $this->getEntityManager()->getRepository('Attachment')->getFilePath($attachment);

            if (!file_exists($filePath)) {
                throw new NotFound();
            }

            $file = $this->initRun($filePath)->resize();

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

            readfile($filePath);
            exit;
        } else {
            parent::run();
        }
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
//                $this->image->resizeImage();
                break;
            case "byWidth":
                break;
            case "byHeigth" :
                break;
        }
    }

}