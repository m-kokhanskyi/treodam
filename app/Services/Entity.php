<?php

namespace Dam\Services;

use Espo\Core\Templates\Services\Base;

class Entity extends Base
{
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
     * @param $name
     * @return mixed
     */
    protected function getService($name)
    {
        return $this->getServiceFactory()->create($name);
    }

    private function isBelongsToAsset($relation)
    {
        return $relation['type'] === "belongsTo" && $relation['entity'] === "Asset";
    }

}