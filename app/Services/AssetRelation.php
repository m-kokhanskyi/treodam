<?php

declare(strict_types=1);

namespace Dam\Services;

use Dam\Entities\Asset;
use Espo\Core\ORM\Entity;
use Espo\Core\Templates\Services\Base;
use Treo\Core\Slim\Http\Request;

class AssetRelation extends Base
{
    public function createLink($entity1, $entity2, $assignedUserId)
    {
        if (is_a($entity1, Asset::class)) {
            $assetEntity   = $entity1;
            $relatedEntity = $entity2;
        } else {
            $assetEntity   = $entity2;
            $relatedEntity = $entity1;
        }

        $r = 1;

        if (
            !$this->isRelatedAssets($assetEntity, $relatedEntity)
            && $this->checkRules($relatedEntity)
            && !$this->checkDuplicate($assetEntity, $relatedEntity)
        ) {
            $this->deleteBelongsRelations($assetEntity, $relatedEntity);
            $this->getRepository()->createLink($assetEntity, $relatedEntity, $assignedUserId);
        }
    }

    public function deleteLink($entity1, $entity2)
    {
        if (is_a($entity1, Asset::class)) {
            $assetEntity   = $entity1;
            $relatedEntity = $entity2;
        } else {
            $assetEntity   = $entity2;
            $relatedEntity = $entity1;
        }

        return $this->getRepository()->deleteLink($assetEntity, $relatedEntity);
    }

    public function deleteLinks(string $entityName, string $entityId)
    {
        return $this->getRepository()->deleteLinks($entityName, $entityId);
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
        $res      = [];

        foreach ($items as $item) {
            $resItems[$item['type']] = $item['count'];
        }

        foreach ($list as $listItem) {
            $res[] = [
                "id"      => $listItem,
                "name"    => $listItem,
                "hasItem" => $resItems[$listItem] ?? false,
            ];
        }

        return $res;
    }

    public function getItems(string $entityId, string $entityName, Request $request)
    {
        if ($request->get('type')) {
            $res = $this->getRepository()->getItemsByType($entityId, $entityName, $request->get("type"));
        } elseif ($request->get("assetIds")) {
            $res = $this->getRepository()->getItemsByAssetIds($entityName, $entityId, explode(",", $request->get("assetIds")));
        }

        if (!isset($res) || !$res) {
            return false;
        }

        foreach ($res as $i => $item) {
            $model = $this->getRepository()->get();
            $model->set($item);
            $this->loadAdditionalFields($model);

            $res[$i] = $model->toArray();
        }

        return $res;
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
            $sql      = '';
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
            "assetId" => $entity->id,
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
                "assetId"    => $asset->id,
            ])->findOne();
        }

        if ($entityTo === "belongsTo") {
            $item = $repository->where([
                'entityName' => $entity->getEntityType(),
                "entityId"   => $entity->id,
            ])->findOne();
        }
        if (!isset($item)) {
            return false;
        }

        return $repository->deleteFromDb($item->id);
    }

    public function deleteRelation(Entity $entity)
    {
        $asset   = $this->getEntityManager()->getEntity("Asset", $entity->getFetched("assetId"));
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
            $entityTo ?? null,
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

    protected function checkRules(Entity $entity)
    {
        $assetLinks = $this->getMetadata()->get("entityDefs.Asset.links");
        $entityName = $entity->getEntityName();

        foreach ($assetLinks as $link) {
            if ($link['entity'] === $entityName && isset ($link['entityAsset']) && !$link['entityAsset']) {
                return false;
            }
        }

        return true;
    }

    protected function isRelatedAssets($entity1, $entity2)
    {
        return get_class($entity1) === get_class($entity2);
    }

}
