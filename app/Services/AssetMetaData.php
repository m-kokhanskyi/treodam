<?php

namespace Dam\Services;

class AssetMetaData extends \Espo\Core\Templates\Services\Base
{
    public function insertData($entityType, $entityId, $metaData)
    {
        $field = $entityType . "_id";
        return $this->getRepository()->insertMeta($field, $entityId, $metaData);
    }
}
