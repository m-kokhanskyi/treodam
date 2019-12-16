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

/**
 * Class Entity
 * @package Dam\Services
 */
class Entity extends Base
{
    /**
     * @param \Espo\Core\ORM\Entity $entity
     * @param                       $userId
     * @return bool
     */
    public function assetRelation(\Espo\Core\ORM\Entity $entity, $userId)
    {
        if (!$list = $this->checkAsset($entity)) {
            return false;
        }

        $service = $this->getService("AssetRelation");

        foreach ($list as $assetId) {
            $assetEntity = $this->getEntityManager()->getEntity("Asset", $assetId);

            if ($assetEntity) {
                $service->createLink($entity, $assetEntity, $userId);
            }
        }
    }

    /**
     * @param \Espo\Core\ORM\Entity $entity
     * @return bool
     */
    public function deleteLinks(\Espo\Core\ORM\Entity $entity)
    {
        if (!$this->checkIssetAssetLink($entity)) {
            return false;
        }

        return $this->getService("AssetRelation")->deleteLinks($entity->getEntityName(), $entity->id);
    }

    /**
     * @param \Espo\Core\ORM\Entity $entity
     * @return array
     */
    protected function checkAsset(\Espo\Core\ORM\Entity $entity)
    {
        $list = [];

        foreach ($entity->getRelations() as $key => $relation) {
            if ($this->isBelongsToAsset($relation) && $entity->isAttributeChanged($relation['key'])) {
                $list[] = $entity->get($relation['key']);
            }
        }

        return $list;
    }

    /**
     * @param \Espo\Core\ORM\Entity $entity
     * @return bool
     */
    protected function checkIssetAssetLink(\Espo\Core\ORM\Entity $entity)
    {
        foreach ($entity->getRelations() as $relation) {
            if ($relation['entity'] === "Asset") {
                return true;
            }
        }

        return false;
    }

    /**
     * @param $name
     * @return mixed
     */
    protected function getService($name)
    {
        return $this->getServiceFactory()->create($name);
    }

    /**
     * @param $relation
     * @return bool
     */
    private function isBelongsToAsset($relation)
    {
        return $relation['type'] === "belongsTo" && $relation['entity'] === "Asset";
    }

}