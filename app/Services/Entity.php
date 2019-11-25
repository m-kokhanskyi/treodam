<?php
declare(strict_types=1);
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

    public function deleteLinks(\Espo\Core\ORM\Entity $entity)
    {
        if (!$this->checkIssetAssetLink($entity)) {
            return false;
        }

        return $this->getService("AssetRelation")->deleteLinks($entity->getEntityName(), $entity->id);
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

    private function isBelongsToAsset($relation)
    {
        return $relation['type'] === "belongsTo" && $relation['entity'] === "Asset";
    }

}