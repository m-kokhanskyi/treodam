<?php

declare(strict_types=1);

namespace Dam\Services;

use Dam\Entities\Asset;
use Espo\Core\ORM\Entity;
use Espo\Core\Templates\Services\Base;

class AssetRelation extends Base
{
    public function createLink($entity1, $entity2, $assignedUserId)
    {
        if (is_a($entity1, Asset::class)) {
            $assetEntity = $entity1;
            $relatedEntity = $entity2;
        } else {
            $assetEntity = $entity2;
            $relatedEntity = $entity1;
        }

        if (!$this->checkDuplicate($assetEntity, $relatedEntity)) {
            $this->deleteBelongsRelations($assetEntity, $relatedEntity);
            $this->getRepository()->createLink($assetEntity, $relatedEntity, $assignedUserId);
        }
    }

    public function checkDuplicate(Entity $assetEntity, Entity $relatedEntity)
    {
        return $this->getRepository()
            ->getEntityAssetsById($assetEntity->id, $relatedEntity->getEntityName(), $relatedEntity->id);
    }

    public function getItemsInList(array $list, string $entityName, string $entityId)
    {
        $items = $this
            ->getRepository()
            ->getItemsInList($list, $entityName, $entityId);

        $resItems = [];
        $res = [];

        foreach ($items as $item) {
            $resItems[$item['type']] = $item['count'];
        }

        foreach ($list as $listItem) {
            $res[] = [
                "name" => $listItem,
                "hasItem" => $resItems[$listItem] ?? false,
            ];
        }

        return $res;
    }

    public function getItems(string $entityId, string $entityName, string $type)
    {
        return $this->getRepository()
            ->getItemsByEntity($entityId, $entityName, $type);
    }

    public function getItem(array $where)
    {
        return $this->getRepository()->where($where)->findOne();
    }

    public function updateSortOrder(string $entityName, string $entityId, array $data): bool
    {
        $result = false;

        if (!empty($data)) {
            $template = "UPDATE asset_relation SET sort_order = %s 
                      WHERE entity_name = '%s' AND entity_id = '%s' AND id = '%s';";
            $sql = '';
            foreach ($data as $k => $id) {
                $sql .= sprintf($template, $k, $entityName, $entityId, $id);
            }

            $sth = $this->getEntityManager()->getPDO()->prepare($sql);
            $sth->execute();

            $result = true;
        }

        return $result;
    }

    public function getRelationsLinks(Entity $entity)
    {
        return $this->getRepository()->where([
            "assetId" => $entity->id
        ])->find();
    }

    public function deleteBelongsRelations(Asset $asset, Entity $entity)
    {
        list($assetTo, $entityTo) = $this->getRelationType($asset, $entity);

        if ($assetTo === "hasMany" && $entityTo === "hasMany") {
            return true;
        }

        /**@var $repository \Dam\Repositories\AssetRelation * */
        $repository = $this->getRepository();

        if ($assetTo === "belongsTo") {
            $item = $repository->where([
                'entityName' => $entity->getEntityType(),
                "assetId" => $asset->id
            ])->findOne();
        }

        if ($entityTo === "belongsTo") {
            $item = $repository->where([
                'entityName' => $entity->getEntityType(),
                "entityId" => $entity->id
            ])->findOne();
        }
        if (!isset($item)) {
            return false;
        }

        return $repository->deleteFromDb($item->id);
    }

    public function deleteRelation(Entity $entity)
    {
        $asset = $this->getEntityManager()->getEntity("Asset", $entity->getFetched("assetId"));
        $fEntity = $this->getEntityManager()->getEntity($entity->getFetched("entityName"), $entity->getFetched("entityId"));

        list($assetTo, $entityTo) = $this->getRelationType($asset, $fEntity);

        switch (true) {
            case $assetTo === "belongsTo" :
                $this->removeBelongsToRelation($asset, $fEntity->getEntityType());
                break;
            case $entityTo === "belongsTo" :
                $this->removeBelongsToRelation($fEntity, "Asset");
                break;
            default:
                $this->removeHasManyRelation($asset, $fEntity);

        }

    }

    public function getAvailableEntities(string $assetId)
    {
        return $this->getRepository()->getAvailableEntities($assetId);
    }

    protected function removeBelongsToRelation(Entity $entity, string $relatedEntityName)
    {
        if (!$info = $this->getRelationInfo($entity, $relatedEntityName)) {
            return false;
        }

        $entity->set($info['key'], null);

        return $this->getEntityManager()->saveEntity($entity, ['skipAll' => true]);
    }

    protected function removeHasManyRelation(Asset $asset, Entity $entity)
    {
        $info = $this->getRelationInfo($asset, $entity->getEntityType());
        /** @var \Espo\Core\Templates\Repositories\Base $relationRepository */
        $relationRepository = $this->getEntityManager()->getRepository($info['relationName']);

        return $relationRepository->unrelate($asset, $info['relationIndex'], $entity);
    }

    protected function getRelationInfo(Entity $entity, string $entityName): array
    {
        foreach ($entity->getRelations() as $key => $relation) {
            if ($relation['entity'] === $entityName) {
                $relation['relationIndex'] = $key;
                return $relation;
            }
        }

        return null;
    }

    protected function getRelationType(Asset $asset, Entity $entity)
    {
        foreach ($asset->getRelations() as $relation) {
            if ($relation['entity'] === $entity->getEntityType()) {
                $assetTo = $relation['type'];
                break;
            }
        }

        foreach ($entity->getRelations() as $relation) {
            if ($relation['entity'] === $asset->getEntityType()) {
                $entityTo = $relation['type'];
                break;
            }
        }

        return [
            $assetTo ?? null,
            $entityTo ?? null
        ];
    }

    /**
     * @param $name
     * @return mixed
     */
    protected function getService($name)
    {
        return $this->getServiceFactory()->create($name);
    }

}
