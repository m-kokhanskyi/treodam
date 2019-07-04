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

use Dam\Core\FileManager\DAMFileManager;
use Dam\Core\FileStorage\DAMStorage;
use Dam\Core\PathBuilder\DAMFilePathBuilder;
use Espo\ORM\Entity;

/**
 * Class Attachment
 *
 * @package Dam\Repositories
 */
class Attachment extends \Espo\Repositories\Attachment
{
    /**
     * @return mixed
     */
    protected function getFileStorageManager()
    {
        return $this->getInjection('fileStorageManager');
    }

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
        return $this->getInjection('DAMFilePathBuilder');
    }

    /**
     * Init method
     */
    protected function init()
    {
        parent::init();
        $this->addDependency('fileStorageManager');
        $this->addDependency('DAMFileManager');
        $this->addDependency('DAMFilePathBuilder');
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

        $sourcePath = $this->getFilePath($source);
        $destPath   = $this->getDestPath();

        if ($this->getFileManager()->copy($sourcePath, (DAMStorage::BASE_PATH . $destPath), false, null, true)) {
            return $destPath;
        }

        return '';
    }

    /**
     * @param Entity $entity
     * @param null   $role
     *
     * @return |null
     * @throws \Espo\Core\Exceptions\Error
     */
    public function getCopiedAttachment(Entity $entity, $role = null)
    {
        $attachment = $this->get();

        $attachment->set([
            'sourceId'        => $entity->getSourceId(),
            'name'            => $entity->get('name'),
            'type'            => $entity->get('type'),
            'size'            => $entity->get('size'),
            'role'            => $entity->get('role'),
            'storageFilePath' => $entity->get('storageFilePath'),
        ]);

        if ($role) {
            $attachment->set('role', $role);
        }

        $this->save($attachment);

        return $attachment;

    }

    /**
     * @return string
     */
    protected function getDestPath(): string
    {
        return $this->getPathBuilder()->createPath();
    }

}
