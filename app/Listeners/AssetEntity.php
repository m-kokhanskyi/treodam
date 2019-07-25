<?php
/** Dam
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

namespace Dam\Listeners;

use Dam\Core\FilePathBuilder;
use Dam\Entities\Asset;
use Dam\Entities\AssetCategory;
use Dam\Listeners\Traits\ValidateCode;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Espo\ORM\Entity;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetEntity
 *
 * @package Dam\Listeners
 */
class AssetEntity extends AbstractListener
{
    use ValidateCode;

    /**
     * @param Event $event
     * @throws BadRequest
     * @throws Error
     */
    public function beforeSave(Event $event)
    {
        /**@var $entity Asset* */
        $entity = $event->getArgument('entity');

        if (!$this->isValidCode($entity)) {
            throw new BadRequest($this->getLanguage()->translate('Code is invalid', 'exceptions', 'Global'));
        }

        if (!$entity->isNew() && $entity->isAttributeChanged("type")) {
            throw new BadRequest("You can't change type");
        }

        if ($entity->isAttributeChanged("imageId") || $entity->isAttributeChanged("fileId")) {
            $this->getImageInfo($entity);
        }

        if ($entity->isNew() || $entity->isAttributeChanged("private")) {
            $entity->set('path', $this->setPath($entity));
        }

        $attachmentService = $this->getService("Attachment");
        $assetService = $this->getService("Asset");

        //After create new asset
        if ($entity->isNew()) {
            $attachmentService->moveToMaster($entity);
        }

        //After upload new file|image
        if ($this->changeAttachment($entity) && !$entity->isNew()) {
            $attachmentService->moveToMaster($entity);
            $assetService->createVersion($entity);
        }

        //After change private (move to other folder)
        if (!$entity->isNew() && $entity->isAttributeChanged("private")) {
            $attachmentService->changeAccess($entity);
            $this->getService("AssetVariant")->rebuildPath($entity);
        }

        //rename file
        if ($entity->isAttributeChanged("nameOfFile")) {
            $attachmentService->changeName($entity->get('image') ?? $entity->get('file'), $entity->get('nameOfFile'), $entity);
        }
    }

    /**
     * @param Entity $entity
     *
     * @return $this
     */
    protected function getImageInfo(Entity $entity)
    {
        $service = $this->getService('Attachment');

        $attachment = $entity->get("image") ?? $entity->get("file");

        if ($attachment) {
            $imageInfo = $service->getImageInfo($attachment);
            $metaData = $service->getFileMetaData($attachment);

            $entity->set([
                "size" => round($imageInfo['size'] / 1024, 1),
                "sizeUnit" => "kb",
                "fileType" => $imageInfo['extension'],
                "width" => $imageInfo['width'] ?? null,
                "height" => $imageInfo['height'] ?? null,
                "colorSpace" => $imageInfo['color_space'] ?? null,
                "colorDepth" => $imageInfo['color_depth'] ?? null,
                "orientation" => $imageInfo['orientation'] ?? null,
                "metaData" => json_encode($metaData)
            ]);
        }

        return $this;
    }

    /**
     * @param Event $event
     *
     * @throws BadRequest
     */
    public function beforeRelate(Event $event)
    {
        $entity = $event->getArgument('foreign');

        if ($this->isLast($event, $entity)) {
            throw new BadRequest($this->getLanguage()->translate("Category is not last", 'exceptions', 'Global'));
        }
    }

    /**
     * @param $entity
     *
     * @return bool
     */
    private function hasChild($entity): bool
    {
        if (is_string($entity)) {
            $entity = $this->getEntityManager()->getRepository("AssetCategory")->where(['id' => $entity])->findOne();
        }

        if (!is_a($entity, AssetCategory::class)) {
            return false;
        }

        return $entity->get('hasChild');
    }

    /**
     * @param Event $event
     * @param       $entity
     *
     * @return bool
     */
    private function isLast(Event $event, $entity): bool
    {
        return $event->getArgument('relationName') == "assetCategories" && $entity && $this->hasChild($entity);
    }

    /**
     * @param Entity $entity
     * @return bool
     */
    private function changeAttachmentOrPrivate(Entity $entity)
    {
        return $entity->isAttributeChanged('private') || $this->changeAttachment($entity);
    }

    private function changeAttachment(Entity $entity)
    {
        return $entity->isAttributeChanged('fileId') || $entity->isAttributeChanged('imageId');
    }

    /**
     * @return mixed
     */
    private function getFilePathBuilder()
    {
        return $this->getContainer()->get('filePathBuilder');
    }

    /**
     * @param Entity $entity
     * @return string
     */
    private function setPath(Entity $entity): string
    {
        /**@var $repository \Dam\Repositories\Asset* */
        $repository = $this->getEntityManager()->getRepository($entity->getEntityType());

        do {
            $type = $entity->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC;
            $path = $this->getFilePathBuilder()->createPath($type);

            $count = $repository->where(['path' => $path])->count();

        } while ($count);

        return $path;
    }
}
