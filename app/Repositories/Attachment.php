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

namespace Dam\Repositories;

use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\Exceptions\Error;
use Espo\Core\ORM\Entity;
use Treo\Core\Utils\File\Manager;

/**
 * Class Attachment
 *
 * @package Dam\Repositories
 */
class Attachment extends \Treo\Repositories\Attachment
{
    protected function init()
    {
        parent::init();
        $this->addDependency("DAMFileManager");
    }

    /**
     * @param Entity $entity
     *
     * @return \Espo\Core\Utils\File\boolen
     * @throws \Espo\Core\Exceptions\Error
     */
    public function copy(Entity $entity): string
    {
        $source = $this->where(["id" => $entity->get('sourceId')])->findOne();

        if (!$source) {
            throw new Error("Source not found");
        }

        $sourcePath = $this->getFilePath($source);
        $related = $entity->get('related');

        if (is_a($related, \Dam\Entities\Asset::class)) {
            $destPath = $related->get('path');
            $path = $related->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH;
        } else {
            $destPath = $this->getDestPath(FilePathBuilder::UPLOAD);
            $path = DAMUploadDir::BASE_PATH;
        }

        if ($this->getFileManager()->copy($sourcePath, ($path . $destPath), false, null, true)) {
            return $destPath;
        }

        return '';
    }

    /**
     * @param Entity $entity
     * @param \Dam\Entities\Asset $asset
     * @return bool
     * @throws Error
     */
    public function moveFile(Entity $entity, \Dam\Entities\Asset $asset): bool
    {
        $file = $this->getFileStorageManager()->getLocalFilePath($entity);
        $fileManager = $this->getFileManager();

        $path = $asset->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH;
        $storePath = $asset->get('path');

        $path = $path . $storePath . "/" . $entity->get('name');

        if ($fileManager->move($file, $path)) {
            $entity->set('storageFilePath', $storePath);
            return $this->save($entity) ? true : false;
        }

        return false;
    }

    /**
     * @param \Dam\Entities\Asset $asset
     * @return mixed
     */
    public function changePrivate(\Dam\Entities\Asset $asset)
    {
        $sourcePath = ($asset->getFetched("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $asset->getFetched("path");
        $distPath = ($asset->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $asset->get("path");

        return $this->getFileManager()->folderCopy($sourcePath, $distPath);
    }

    /**
     * @param Entity $entity
     * @param null $role
     *
     * @return |null
     * @throws \Espo\Core\Exceptions\Error
     */
    public function getCopiedAttachment(Entity $entity, $role = null)
    {
        $attachment = $this->get();

        $attachment->set([
            'sourceId' => $entity->getSourceId(),
            'name' => $entity->get('name'),
            'type' => $entity->get('type'),
            'size' => $entity->get('size'),
            'role' => $entity->get('role'),
            'storageFilePath' => $entity->get('storageFilePath'),
            'relatedType' => $entity->get('relatedType'),
            'relatedId' => $entity->get('relatedId'),
        ]);

        if ($role) {
            $attachment->set('role', $role);
        }

        $this->save($attachment);

        return $attachment;

    }

    /**
     * @param \Espo\ORM\Entity $entity
     * @return bool
     */
    public function removeThumbs(\Espo\ORM\Entity $entity)
    {
        foreach (DAMUploadDir::thumbsFolderList() as $path) {
            $dirPath = $path . $entity->get('storageFilePath');
            if (!is_dir($dirPath)) {
                continue;
            }

            return $this->getFileManager()->removeInDir($dirPath);
        }
    }

    /**
     * @return Manager
     */
    protected function getFileManager(): Manager
    {
        return $this->getInjection("DAMFileManager");
    }

}
