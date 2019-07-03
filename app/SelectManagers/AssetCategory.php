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
 * Class AssetCategory
 *
 * @package Dam\SelectManagers
 */
class AssetCategory extends AbstractSelectManager
{
    /**
     * NotEntity filter
     *
     * @param array $result
     */
    protected function boolFilterNotEntity(&$result)
    {
        if ($value = $this->getBoolData('notEntity')) {
            $value = (array)$value;

            foreach ($value as $id) {
                $result['whereClause'][] = [
                    'id!=' => (string)$id,
                ];
            }
        }
    }

    /**
     * @param $result
     */
    protected function boolFilterNotAttachment(&$result)
    {
        $result['whereClause'][] = [
            "id!=s" => [
                "selectParams" => [
                    "select"      => ['asset_category_asset.asset_category_id'],
                    "customJoin"  => "JOIN asset_category_asset ON asset_category_asset.asset_category_id = asset_category.id",
                    "whereClause" => [
                        'asset_category_asset.deleted' => 0,
                    ],
                ],
            ],
        ];
    }

    /**
     * @param $result
     */
    protected function boolFilterNotSelectCategories(&$result)
    {
        if ($value = $this->getBoolData('notSelectCategories')) {
            $result['whereClause'][] = [
                "id!=s" => [
                    "selectParams" => [
                        "select"      => ['asset_category_asset.asset_category_id'],
                        "customJoin"  => "JOIN asset_category_asset ON asset_category_asset.asset_category_id = asset_category.id",
                        "whereClause" => [
                            'asset_category_asset.asset_id' => (string)$value,
                            'asset_category_asset.deleted'  => 0,
                        ],
                    ],
                ],
            ];
        }
    }

    /**
     * @param $result
     */
    protected function boolFilterNotChildCategory(&$result)
    {
        if ($value = $this->getBoolData('notChildCategory')) {
            $result['whereClause'][] = [
                'categoryRoute!*' => "%|$value|%",
            ];
        }
    }

    /**
     * @param $result
     */
    protected function boolFilterOnlyChildCategory(&$result)
    {
        $result['whereClause'][] = [
            'hasChild' => 0,
        ];
    }

}
