<?php
/**
 * Dam
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

declare(strict_types=1);

namespace Dam\Core;

use Espo\Core\Exceptions\Error;
use Treo\Core\Utils\File\Manager;

/**
 * Class FileManager
 * @package Dam\Core
 */
class FileManager extends Manager
{
    /**
     * @param string $dirPath
     * @param bool   $removeWithDir
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
    public function moveFolder($source, $dist)
    {
        $res = true;

        $fileList = $this->getSingeFileList($this->getFileList($source, true), true);

        foreach ($fileList as $fileItem) {
            $res &= $this->move($source . "/" . $fileItem, $dist . "/" . $fileItem);
        }

        return $res;
    }

    /**
     * @param string $path
     * @param string $newName
     * @return bool
     * @throws Error
     */
    public function renameFile(string $path, string $newName): bool
    {
        if (!file_exists($path)) {
            throw new Error("File not found");
        }

        $pathInfo = pathinfo($path);
        $newPath  = $pathInfo['dirname'] . "/{$newName}";

        if ($this->checkCreateFile($newPath) === false) {
            throw new Error('Permission denied for ' . $newPath);
        }

        return rename($path, $newPath);
    }
}