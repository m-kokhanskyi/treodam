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

namespace Dam\SelectManagers;

/**
 * Class Asset
 *
 * @package Dam\SelectManagers
 */
class Asset extends AbstractSelectManager
{
    /**
     * @param $result
     */
    protected function boolFilterNotSelectAssets(&$result)
    {
        if ($value = $this->getBoolData('notSelectAssets')) {
            $result['whereClause'][] = [
                "id!=s" => [
                    "selectParams" => [
                        "select" => ['asset_category_asset.asset_id'],
                        "customJoin" => "JOIN asset_category_asset ON asset_category_asset.asset_id = asset.id",
                        "whereClause" => [
                            'asset_category_asset.asset_category_id' => (string)$value,
                            'asset_category_asset.deleted' => 0,
                        ],
                    ],
                ],
            ];
        }
    }

    protected function boolFilterLinkedWithAssetCategory(&$result)
    {
        // prepare category
        $category = $this
            ->getEntityManager()
            ->getEntity('AssetCategory', (string)$this->getBoolData('linkedWithAssetCategory'));

        if (!empty($category)) {
            // get category tree products
            $products = $category->getTreeAssets();

            $result['whereClause'][] = [
                'id' => count($products > 0) ? array_column($products->toArray(), 'id') : []
            ];
        }
    }


}
