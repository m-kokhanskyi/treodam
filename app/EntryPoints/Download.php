<?php

declare(strict_types=1);
namespace Dam\EntryPoints;

use Dam\Core\Download\Custom;
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

        $file = (new Custom($filePath))
            ->setAttachment($attachment)
            ->setParams($_GET)
            ->convert();

        $type = $file->getType();

        header('Content-Description: File Transfer');
        if ($type) {
            header('Content-Type: ' . $type);
        }
        header("Content-Disposition: attachment;filename=\"" . $file->getName() . "\"");
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . $file->getImageSize());

        echo $file->getImage();
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

}