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

namespace Dam\Entities;

use Espo\Core\Exceptions\Error;
use \Espo\Core\Templates\Entities\Base;
use Espo\ORM\EntityCollection;

/**
 * Class AssetCategory
 *
 * @package Dam\Entities
 */
class AssetCategory extends Base
{
    protected $entityType = "AssetCategory";

    /**
     * @return EntityCollection
     * @throws Error
     */
    public function getTreeAssets(): EntityCollection
    {
        // validation
        $this->isEntity();

        // prepare where
        $where = [
            'assetCategories.id' => [$this->get('id')]
        ];

        $categoryChildren = $this->getChildren();

        if (count($categoryChildren) > 0) {
            $where['assetCategories.id'] = array_merge($where['assetCategories.id'], array_column($categoryChildren->toArray(), 'id'));
        }

        return $this
            ->getEntityManager()
            ->getRepository('Asset')
            ->distinct()
            ->join('assetCategories')
            ->where($where)
            ->find();
    }

    /**
     * @return EntityCollection
     * @throws Error
     */
    public function getChildren(): EntityCollection
    {
        // validation
        $this->isEntity();

        return $this
            ->getEntityManager()
            ->getRepository('AssetCategory')
            ->where(['categoryRoute*' => "%|" . $this->get('id') . "|%"])
            ->find();
    }

    /**
     * @return bool
     * @throws Error
     */
    protected function isEntity(): bool
    {
        if (empty($id = $this->get('id'))) {
            throw new Error('AssetCategory is not exist');
        }

        return true;
    }
}
