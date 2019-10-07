<?php

namespace Dam\Repositories;

use Dam\Core\ORM\Query\DamQuery;
use Espo\Core\ORM\Entity;
use Espo\Core\Templates\Repositories\Base;
use PDO;

class AssetRelation extends Base
{
    public function createLink(Entity $asset, Entity $related, string $assignedUserId)
    {
        $entity = $this->get();

        $entity->set([
            "name" => $asset->get("name") . " / " . $asset->get("size"),
            "entityName" => $related->getEntityName(),
            "entityId" => $related->id,
            "assetId" => $asset->id,
            "assetType" => $asset->type,
            "assignedUserId" => $assignedUserId
        ]);

        $this->save($entity);
    }

    public function getEntityAssetsById(string $assetId, string $entityName, string $entityId)
    {
        return $this->where([
            "assetId" => $assetId,
            "entityName" => $entityName,
            "entityId" => $entityId
        ])->findOne();
    }

    public function getItemsInList(array $list, string $entityName, string $entityId)
    {
        return $this->getData($this->getSqlItemsInList($list), [$entityId, $entityName]);
    }

    public function getItemsByEntity($entityId, $entityName, $type)
    {
        $entity = $this->getEntityManager()->getEntity("AssetRelation");

        $fieldsList = array_filter($entity->getAttributeList(), function ($item) {
            return !in_array($item, $this->skipAttributeList());
        });

        $select = $this->getDamQuery()->createSelectStatement($entity, $fieldsList);

        if ($entityName === "Asset") {

            $tableName = $this->getDamQuery()->toDb($type);

            $sql = "    SELECT {$select}, {$tableName}.name as name
                    FROM asset_relation
                    INNER JOIN {$tableName} ON ({$tableName}.id = asset_relation.entity_id)
                    WHERE asset_relation.asset_id = ?
                        AND {$tableName}.deleted = '0'
                        AND asset_relation.deleted = '0'";
            $data = [$entityId];
        } else {
            $sql = "    SELECT {$select}, CONCAT(asset.name, ' / ', asset.size) as name
                    FROM asset_relation
                    INNER JOIN asset ON (asset.id = asset_relation.asset_id)
                    WHERE asset_relation.entity_id = ?
                        AND asset_relation.entity_name = ?
                        AND asset.type = ?
                        AND asset.deleted = '0'
                        AND asset_relation.deleted = '0'
                    ORDER BY asset_relation.sort_order ASC";
            $data = [$entityId, $entityName, $type];
        }

        return $this->getData($sql, $data);

    }

    public function getAvailableEntities($assetId)
    {
        return $this->getData("SELECT entity_name as entityName FROM asset_relation where deleted = 0 AND asset_id = ? GROUP BY entity_name", [$assetId]);
    }


    protected function getData(string $sql, array $data = [])
    {
        $pdo = $this->getPDO();

        $stmt = $pdo->prepare($sql);

        $stmt->execute($data);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function getSqlItemsInList(array $list)
    {
        return "SELECT COUNT('id') as count, a.type
                FROM asset_relation as ar
                    INNER JOIN asset as a ON (a.id = ar.asset_id)
                WHERE ar.entity_id = ?
                  AND ar.entity_name = ?
                  AND a.type IN ('" . implode("','", $list) . "')
                  AND a.deleted = '0'
                  AND ar.deleted = '0'
                GROUP BY a.type";
    }

    protected function getDamQuery()
    {
        return new DamQuery($this->getPDO(), $this->entityFactory);
    }

    private function skipAttributeList()
    {
        return [
            "deleted",
            "createAt",
            "modifiedAt",
            "createdById",
            "createdByName",
            "modifiedById",
            "modifiedByName",
            "assignedUserId",
            "assignedUserName",
            "teamsIds",
            "teamsNames",
        ];
    }
}
