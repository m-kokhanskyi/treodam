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

use Espo\Core\Utils\Util;

/**
 * Class AssetMetaData
 * @package Dam\Repositories
 */
class AssetMetaData extends \Espo\Core\Templates\Repositories\Base
{
    const TABLE_NAME = "asset_meta_data";

    /**
     * @param string $field
     * @param string $id
     * @return mixed
     */
    public function clearData(string $field, string $id)
    {
        return $this->getPDO()->exec("DELETE FROM " . static::TABLE_NAME . " WHERE {$field} = '{$id}'");
    }

    /**
     * @param $field
     * @param $id
     * @param $metaData
     * @return bool
     */
    public function insertMeta($field, $id, $metaData)
    {
        $res  = true;
        $stmt = $this->getPDO()->prepare("INSERT INTO " . static::TABLE_NAME . " (id, name, value, {$field}) VALUES (?,?,?,?)");

        foreach ($metaData as $k => $v) {
            $res &= $stmt->execute([Util::generateId(), $k, $v, $id]);
        }

        return $res;
    }
}
