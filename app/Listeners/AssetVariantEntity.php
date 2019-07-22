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

use Espo\ORM\Entity;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetVariantEntity
 * @package Dam\Listeners
 */
class AssetVariantEntity extends AbstractListener
{
    public function beforeSave(Event $event)
    {
        /**@var $entity Entity */
        $entity = $event->getArgument('entity');

        if ($entity->isNew()) {
            $this->getService($entity->getEntityType())->moveToDam($entity);
        }

        if (!$entity->isNew() && $this->updateAttachment($entity)) {
            $this->getService($entity->getEntityType())->moveToDam($entity);
            $this->getService($entity->getEntityType())->createVersion($entity);
        }
    }


    protected function updateAttachment(Entity $entity)
    {
        return $entity->isAttributeChanged('fileId') || $entity->isAttributeChanged('imageId');
    }
}
