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

use Dam\Core\FileManager;
use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\Exceptions\Error;
use Espo\Core\ORM\Entity;

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
            'hash_md5' => $entity->get('hash_md5')
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
     * @param Entity $entity
     * @param string $path
     * @return mixed
     * @throws Error
     */
    public function updateStorage(Entity $entity, string $path)
    {
        $entity->set("storageFilePath", $path);
        $entity->set("tmpPath", null);

        return $this->save($entity);
    }

    /**
     * @param Entity $attachment
     * @param string $newFileName
     * @param Entity|null $entity
     * @return bool
     * @throws Error
     */
    public function renameFile(Entity $attachment, string $newFileName, Entity $entity = null): bool
    {
        $path = $this->buildPath($entity, $attachment);
        $pathInfo = pathinfo($path);
        if ($pathInfo['basename'] == $newFileName) {
            return true;
        }

        if ($this->getFileManager()->renameFile($path, $newFileName)) {
            $attachment->set("name", $newFileName);

            return $this->save($attachment) ? true : false;
        }

        return false;
    }

    /**
     * @param $attachment
     * @param $data
     * @return mixed
     * @throws Error
     */
    public function saveImageInfo ($attachment, $data)
    {
        $attachment->set([
            "size" => round($data['size'] / 1024, 1),
            "sizeUnit" => "kb",
            "fileType" => $data['extension'],
            "width" => $data['width'] ?? null,
            "height" => $data['height'] ?? null,
            "colorSpace" => $data['color_space'] ?? null,
            "colorDepth" => $data['color_depth'] ?? null,
            "orientation" => $data['orientation'] ?? null
        ]);

        return $this->save($attachment);
    }

    /**
     * @return FileManager
     */
    protected function getFileManager(): FileManager
    {
        return $this->getInjection("DAMFileManager");
    }

    private function buildPath(Entity $entity, Entity $attachment): string
    {
        return ($entity->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "master/" . $entity->get('path') . "/" . $attachment->get('name');

    }
}
