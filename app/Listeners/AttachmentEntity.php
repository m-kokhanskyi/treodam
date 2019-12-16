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

use Dam\Entities\Attachment;
use Espo\Core\Exceptions\InternalServerError;
use Treo\Core\EventManager\Event;
use Treo\Core\Utils\File\Manager;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetEntity
 *
 * @package Dam\Listeners
 */
class AttachmentEntity extends AbstractListener
{
    /**
     * @param Event $event
     * @throws InternalServerError
     */
    public function beforeSave(Event $event)
    {
        /**@var $entity Attachment* */
        $entity = $event->getArgument('entity');

        if ($entity->isNew() && $entity->get("contents") && $entity->get('relatedType') === "Asset") {
            $entity->set('hash_md5', md5($entity->get("contents")));
        }
    }

    /**
     * @param Event $event
     */
    public function afterSave(Event $event)
    {
    }

    /**
     * @param Event $event
     */
    public function afterRemove(Event $event)
    {
        $entity = $event->getArgument('entity');

        $this->getEntityManager()->getRepository("Attachment")->removeThumbs($entity);
    }

    /**
     * @return Manager
     */
    protected function getFileManager(): Manager
    {
        return $this->container->get('FileManager');
    }
}
