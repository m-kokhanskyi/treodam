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

namespace Dam\Core\FileStorage;

use Dam\Core\FileManager\DAMFileManager;
use Dam\Core\PathBuilder\DAMFilePathBuilder;
use Espo\Core\Exceptions\Error;
use Espo\Entities\Attachment;
use Espo\Core\FileStorage\Storages\Base;

/**
 * Class DAMStorage
 *
 * @package Espo\Modules\Dam\Core\FileStorage
 */
class DAMStorage extends Base
{
    /**
     * @var array
     */
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
