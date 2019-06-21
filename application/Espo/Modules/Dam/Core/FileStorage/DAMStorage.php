<?php


namespace Espo\Modules\Dam\Core\FileStorage;

use Espo\Core\Exceptions\Error;
use Espo\Entities\Attachment;
use Espo\Core\FileStorage\Storages\Base;
use Espo\Modules\Dam\Core\FileManager\DAMFileManager;
use Espo\Modules\Dam\Core\PathBuilder\DAMFilePathBuilder;

/**
 * Class DAMStorage
 *
 * @package Espo\Modules\Dam\Core\FileStorage
 */
class DAMStorage extends Base
{
    protected $dependencyList = ['DAMFileManager','DAMFilePathBuilder'];

    /**
     * @return DAMFileManager
     */
    protected function getFileManager()
    {
        return $this->getInjection('DAMFileManager');
    }

    /**
     * @return DAMFilePathBuilder
     */
    protected function getPathBuilder()
    {
        return $this->getInjection("DAMFilePathBuilder");
    }

    /**
     * @param Attachment $attachment
     *
     * @return bool
     *
     */
    public function hasDownloadUrl(Attachment $attachment)
    {
        return false;
    }

    /**
     * @param Attachment $attachment
     *
     * @throws Error
     */
    public function getDownloadUrl(Attachment $attachment)
    {
        throw new Error();
    }

    /**
     * @param Attachment $attachment
     *
     * @return bool
     */
    public function unlink(Attachment $attachment)
    {
        return $this->getFileManager()->unlink($this->getFilePath($attachment));
    }

    /**
     * @param Attachment $attachment
     *
     * @return mixed
     */
    public function getContents(Attachment $attachment)
    {
        return $this->getFileManager()->getContents($this->getFilePath($attachment));
    }

    /**
     * @param Attachment $attachment
     *
     * @return bool
     */
    public function isFile(Attachment $attachment)
    {
        return $this->getFileManager()->isFile($this->getFilePath($attachment));
    }

    /**
     * @param Attachment $attachment
     * @param            $contents
     *
     * @return bool
     * @throws Error
     */
    public function putContents(Attachment $attachment, $contents)
    {
        return $this->getFileManager()->putContents($this->getFilePath($attachment), $contents);
    }

    /**
     * @param Attachment $attachment
     *
     * @return string
     */
    public function getLocalFilePath(Attachment $attachment)
    {
        return $this->getFilePath($attachment);
    }

    /**
     * @param Attachment $attachment
     *
     * @return string
     */
    private function getFilePath(Attachment $attachment): string
    {
        $storage  = $attachment->get('storageFilePath');

        if (!$storage) {
            $storage = $this->getPathBuilder()->createPath();
            $attachment->set('storageFilePath', $storage);
        }

        return "data/upload/{$storage}/" . $attachment->get('name');
    }
}
