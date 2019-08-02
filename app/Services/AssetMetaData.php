<?php

namespace Dam\Services;

class AssetMetaData extends \Espo\Core\Templates\Services\Base
{
    public function insertData($assetId, $metaData)
    {
        return $this->getRepository()->insertMeta($assetId, $metaData);
    }
}
