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

use Dam\Entities\Collection;
use Dam\Listeners\Traits\ValidateCode;
use Espo\Core\Exceptions\BadRequest;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetEntity
 *
 * @package Dam\Listeners
 */
class CollectionEntity extends AbstractListener
{
    use ValidateCode;

    /**
     * @param Event $event
     * @throws BadRequest
     */
    public function beforeSave(Event $event)
    {
        /**@var $entity Collection* */
        $entity = $event->getArgument('entity');

        if (!$this->isValidCode($entity)) {
            throw new BadRequest($this->getLanguage()->translate('Code is invalid', 'exceptions', 'Global'));
        }
    }

    public function afterSave(Event $event)
    {
        /**@var $entity Collection* */
        $entity = $event->getArgument("entity");

        if ($entity->isAttributeChanged("isDefault")) {
            $this->getService("Collection")->updateDefault($entity);
        }
    }

    /**
     * @param Event $event
     * @throws BadRequest
     */
    public function beforeRelate(Event $event)
    {
        if ($event->getArgument('relationName') == "assetCategories" && !$this->isValidCategory($event->getArgument('foreign'))) {
            throw new BadRequest("Only root category");
        }
    }

    /**
     * @param $entity
     * @return bool
     * @throws \Espo\Core\Exceptions\Error
     */
    protected function isValidCategory($entity)
    {
        if (is_string($entity)) {
            $entity = $this->getEntityManager()->getEntity("AssetCategory", $entity);
        }

        return !$entity->get("categoryParentId");
    }

}
