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

namespace Dam\Services;

use Espo\Core\Templates\Services\Base;
use Espo\ORM\Entity;

/**
 * Class Asset
 * @package Dam\Services
 */
class Asset extends Base
{
    /**
     * @param Entity $entity
     * @return mixed
     */
    public function createVersion(Entity $entity)
    {
        $attachmentId = $entity->getFetched("type") === "Image" ? $entity->getFetched("imageId") : $entity->getFetched("fileId");

        $attachment = $this->getEntityManager()->getEntity("Attachment", $attachmentId);

        return $this->getServiceFactory()->create("AssetVersion")->createEntity($attachment);
    }
}
