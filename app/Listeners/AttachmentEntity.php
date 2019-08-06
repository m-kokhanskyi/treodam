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

use Dam\Listeners\Traits\ValidateCode;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\InternalServerError;
use Espo\ORM\Entity;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetEntity
 *
 * @package Dam\Listeners
 */
class AttachmentEntity extends AbstractListener
{

    public function beforeSave(Event $event)
    {
        $entity = $event->getArgument('entity');

        $this->copyFile($entity);
    }

    protected function isDuplicate(Entity $entity): bool
    {
        return (!$entity->isNew() && $entity->get('sourceId'));
    }

    protected function copyFile(Entity $entity): void
    {
        if ($this->isDuplicate($entity)) {
            $repository = $this->getEntityManager()->getRepository($entity->getEntityType());
            $path       = $repository->copy($entity);

            if (!$path) {
                throw new InternalServerError($this->getLanguage()->translate("Can't copy file", 'exceptions', 'Global'));
            }

            $entity->set([
                'sourceId'        => null,
                'storageFilePath' => $path,
            ]);
        }
    }

}
