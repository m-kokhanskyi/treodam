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

use Dam\Core\ConfigManager;
use Dam\Core\FileManager;
use Espo\Core\Templates\Services\Base;
use Espo\Core\Utils\Log;
use Espo\ORM\Entity;

/**
 * Class Asset
 *
 * @package Dam\Services
 */
class Asset extends Base
{
    /**
     * Asset constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->addDependency("DAMFileManager");
        $this->addDependency("ConfigManager");
        $this->addDependency('log');
    }

    /**
     * @param \Dam\Entities\Asset $asset
     * @return bool
     */
    public function createVersion(\Dam\Entities\Asset $asset)
    {
        $type = ConfigManager::getType($asset->get("type"));

        if (!$this->getConfigManager()->get([$type, "createVersion"])) {
            return true;
        }

        $nature = $this->getConfigManager()->get([$type, "nature"]);

        $attachmentId = $nature === "image" ? $asset->getFetched("imageId") : $asset->getFetched("fileId");

        $attachment = $this->getEntityManager()->getEntity("Attachment", $attachmentId);

        return $this->getServiceFactory()->create("AssetVersion")->createEntity($attachment);
    }

    /**
     * @param \Dam\Entities\Asset $asset
     * @return mixed
     */
    public function updateMetaData(\Dam\Entities\Asset $asset)
    {
        $attachment = $asset->get('image') ?? $asset->get('file');

        $metaData = $this->getServiceFactory()->create("Attachment")->getFileMetaData($attachment);

        return $this->getServiceFactory()->create("AssetMetaData")->insertData("asset", $asset->id, $metaData);
    }

    /**
     * @param \Dam\Entities\Asset $asset
     */
    public function getImageInfo(\Dam\Entities\Asset $asset)
    {
        $type   = ConfigManager::getType($asset->get('type'));
        $nature = $this->getConfigManager()->get([$type, "nature"]);

        $attachment = $nature === "image" ? $asset->get("image") : $asset->get("file");
        $imageInfo  = $this->getService("Attachment")->getImageInfo($attachment);

        $asset->set([
            "size"     => round($imageInfo['size'] / 1024, 1),
            "sizeUnit" => "kb",
        ]);

        if ($nature === "image") {
            $this->updateAttributes($asset, $imageInfo);
        }
    }

    public function updateAttributes(\Dam\Entities\Asset $asset, array $imageInfo)
    {
        $asset->set("height", ($imageInfo['height'] ?? false) ? $imageInfo['height'] : null);
        $asset->set("width", ($imageInfo['width'] ?? false) ? $imageInfo['width'] : null);
        $asset->set("colorSpace", ($imageInfo['color-space'] ?? false) ? $imageInfo['color-space'] : null);
        $asset->set("colorDepth", ($imageInfo['color-depth'] ?? false) ? $imageInfo['color-depth'] : null);
        $asset->set("orientation", ($imageInfo['orientation'] ?? false) ? $imageInfo['orientation'] : null);
    }

    public function getRelationsCount(Entity $entity)
    {
        $collection = $this->getService("AssetRelation")->getRelationsLinks($entity);

        return $collection->count();
    }

    public function assetRelation(Entity $entity, $userId)
    {
        if (!$list = $this->checkIssetLink($entity)) {
            return false;
        }

        $service = $this->getService("AssetRelation");

        foreach ($list as $item) {
            $fEntity = $this->getEntityManager()->getEntity($item['entityName'], $item['entityId']);

            if ($fEntity) {
                $service->createLink($entity, $fEntity, $userId);
            }
        }

        return true;
    }

    public function deleteLinks(Entity $entity)
    {
        return $this->getService("AssetRelation")->deleteLinks("Asset", $entity->id);
    }

    /**
     * @return FileManager
     */
    protected function getFileManager(): FileManager
    {
        return $this->getInjection("DAMFileManager");
    }

    /**
     * @return ConfigManager
     */
    protected function getConfigManager(): ConfigManager
    {
        return $this->getInjection("ConfigManager");
    }

    /**
     * @return Log
     */
    protected function getLog(): Log
    {
        return $this->getInjection("log");
    }

    /**
     * @param $name
     * @return mixed
     */
    protected function getService($name)
    {
        return $this->getServiceFactory()->create($name);
    }

    protected function checkIssetLink(Entity $entity)
    {
        $list = [];

        foreach ($entity->getRelations() as $key => $relation) {
            if ($this->isMulti($entity, $relation, $key)) {
                $list[] = [
                    "entityName" => $relation['entity'],
                    "entityId"   => $entity->get($relation['key']),
                ];
            }
        }

        return $list;
    }

    protected function skipEntityAssets(string $key)
    {
        return !$this->getMetadata()->get(['entityDefs', 'Asset', 'links', $key, 'entityAsset']);
    }

    /**
     * @param Entity $entity
     * @param        $relation
     * @param        $key
     * @return bool
     */
    protected function isMulti(Entity $entity, $relation, $key): bool
    {
        return $relation['type'] === "belongsTo"
            &&
            $entity->isAttributeChanged($relation['key'])
            &&
            $key !== "ownerUser"
            &&
            !$this->skipEntityAssets($key);
    }
}
