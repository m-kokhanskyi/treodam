<?php

namespace Dam\Repositories;

use Espo\Core\Utils\Util;

class AssetMetaData extends \Espo\Core\Templates\Repositories\Base
{
    public function insertMeta($assetId, $metaData)
    {
        $res = true;
        $stmt = $this->getPDO()->prepare("INSERT INTO asset_meta_data (id, name, value, asset_id) VALUES (?,?,?,?)");

        foreach ($metaData as $k => $v) {
            $res &= $stmt->execute([Util::generateId(), $k, $v, $assetId]);
        }

        return $res;
    }
}
