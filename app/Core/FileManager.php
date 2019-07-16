<?php


namespace Dam\Core;

use Treo\Core\Utils\File\Manager;

class FileManager extends Manager
{
    /**
     * @param string $dirPath
     * @param bool $removeWithDir
     * @return bool
     */
    public function removeInDir($dirPath, $removeWithDir = false)
    {
        if (parent::removeInDir($dirPath, true)) {
            $this->removeEmptyDirs($dirPath);
            return true;
        }

        return false;
    }

    /**
     * @param $source
     * @param $dist
     * @return bool
     * @throws \Espo\Core\Exceptions\Error
     */
    public function folderCopy($source, $dist)
    {
        $res = true;

        $fileList = $this->getSingeFileList($this->getFileList($source, true), true);

        foreach ($fileList as $fileItem) {
            $res &= $this->move($source . "/" . $fileItem, $dist . "/" . $fileItem);
        }

        return $res;
    }
}