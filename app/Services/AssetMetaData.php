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

/**
 * Class AssetMetaData
 * @package Dam\Services
 */
class AssetMetaData extends \Espo\Core\Templates\Services\Base
{
    /**
     * @param $entityType
     * @param $entityId
     * @param $metaData
     * @return mixed
     */
    public function insertData($entityType, $entityId, $metaData)
    {
        $field = $entityType . "_id";

        $repository = $this->getRepository();

        $repository->clearData($field, $entityId);

        return $repository->insertMeta($field, $entityId, $metaData);
    }
}
