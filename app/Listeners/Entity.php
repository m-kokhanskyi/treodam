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

use Dam\Entities\Asset;
use Espo\Core\Exceptions\BadRequest;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class Entity
 * @package Dam\Listeners
 */
class Entity extends AbstractListener
{
    /**
     * @param Event $event
     */
    public function beforeRelate(Event $event)
    {
        $entity  = $event->getArgument('entity');
        $foreign = $event->getArgument('foreign');

        if (is_string($foreign) && $relationName = $event->getArgument("relationName")) {
            $entityName = $entity->getRelations()[$relationName]['entity'];
            $foreign    = $this->getEntityManager()->getEntity($entityName, $foreign);
        }

        $userId      = $this->getUser()->id;
        $assetEntity = is_a($entity, Asset::class) ? $entity : $foreign;
        if (!$assetEntity->get("isActive") && is_a($assetEntity, Asset::class)) {
            throw new BadRequest($this->getLanguage()->translate("CantAddInActive", 'exceptions', 'Asset'));
        }

        if (is_a($entity, Asset::class) || is_a($foreign, Asset::class)) {
            $this->getService("AssetRelation")->createLink($entity, $foreign, $userId);
        }
    }

    /**
     * @param Event $event
     */
    public function afterUnrelate(Event $event)
    {
        $entity  = $event->getArgument('entity');
        $foreign = $event->getArgument('foreign');

        if (is_string($foreign) && $relationName = $event->getArgument("relationName")) {
            $entityName = $entity->getRelations()[$relationName]['entity'];
            $foreign    = $this->getEntityManager()->getEntity($entityName, $foreign);
        }

        if (is_a($entity, Asset::class) || is_a($foreign, Asset::class)) {
            $this->getService("AssetRelation")->deleteLink($entity, $foreign);
        }
    }

    /**
     * @param Event $event
     * @return bool
     */
    public function afterSave(Event $event)
    {
        $entity = $event->getArgument("entity");
        $userId = $this->getUser()->id;

        if (!$userId) {
            return false;
        }

        if (is_a($entity, Asset::class)) {
            $this->getService("Asset")->assetRelation($entity, $userId);
        } else {
            $this->getService("Entity")->assetRelation($entity, $userId);
        }
    }

    /**
     * @param Event $event
     */
    public function afterRemove(Event $event)
    {
        $entity = $event->getArgument("entity");

        if (is_a($entity, Asset::class)) {
            $this->getService("Asset")->deleteLinks($entity);
        } else {
            $this->getService("Entity")->deleteLinks($entity);
        }
    }

    /**
     * @return mixed
     */
    protected function getUser()
    {
        return $this->getContainer()->get('user');
    }
}