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

namespace Dam\Listeners;

use Dam\Core\ConfigManager;
use Dam\Entities\Rendition;
use Espo\Core\Exceptions\BadRequest;
use Espo\ORM\Entity;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetCategoryEntity
 *
 * @package Dam\Listeners
 *
 */
class RenditionEntity extends AbstractListener
{
    public function beforeSave(Event $event)
    {
        /**@var $entity Entity* */
        $entity = $event->getArgument("entity");

        $info = $this->getConfigManager()->get([
            ConfigManager::getType($entity->get("asset")->get("type")),
            "renditions",
            $entity->get("type")
        ]);

        if ($this->changeAttachmentInAuto($entity, $info)) {
            throw new BadRequest("You can't change attachment for this rendition");
        }

        if (!$entity->isNew() && $entity->isAttributeChanged("type")) {
            throw new BadRequest("You can't change type");
        }

        if ($entity->isNew()) {
            $this->getService($entity->getEntityType())->validateType($entity);
        }

        if (!$entity->isNew() && $this->changeAttachment($entity)) {
            if (isset($info['createVersion']) && $info['createVersion']) {
                $this->getService($entity->getEntityType())->createVersion($entity);
            }
        }

        $attachment = $entity->get("image") ?? $entity->get("file");
        if ($attachment->get("tmpPath")) {
            $this->getService("Attachment")->moveToRendition($entity, $attachment);
        }

        if ($this->changeAttachment($entity)) {
            $this->getService($entity->getEntityType())->updateAttachmentInfo($entity);
        }

        if (!$entity->get("nameOfFile")) {
            $this->getService($entity->getEntityType())->createNameOfFile($entity);
        } elseif ($entity->isAttributeChanged("nameOfFile")) {
            $this->getService("Attachment")
                ->changeName($attachment, $entity->get("nameOfFile"), $entity);
        }

        if (!$entity->isNew() && $entity->isAttributeChanged("private")) {
            $this->getService("Attachment")->changeAccess($entity);
        }
    }

    /**
     * @param Event $event
     */
    public function afterSave(Event $event)
    {
        /**@var $entity \Dam\Entities\Rendition* */
        $entity = $event->getArgument('entity');

        if ($entity->isNew() || $this->changeAttachment($entity)) {
            $this->getService("Rendition")->updateMetaData($entity);
        }
    }

    protected function changeAttachment(Entity $entity)
    {
        return $entity->isAttributeChanged("fileId") || $entity->isAttributeChanged("imageId");
    }

    protected function getConfigManager(): ConfigManager
    {
        return $this->container->get("ConfigManager");
    }

    /**
     * @param Entity $entity
     * @param array $info
     * @return bool
     */
    private function changeAttachmentInAuto(Rendition $entity, ?array $info): bool
    {
        return !$entity->isNew() && $this->changeAttachment($entity) && $info['auto'] && !$entity->isAutoCreated;
    }
}
