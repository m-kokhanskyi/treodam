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

/**
 * Class Asset
 *
 * @package Dam\Services
 */
class Asset extends Base
{
    public function __construct()
    {
        parent::__construct();

        $this->addDependency("DAMFileManager");
        $this->addDependency("ConfigManager");
        $this->addDependency('log');
    }

    /**
     * @param \Dam\Entities\Asset $asset1
     *
     * @return mixed
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

    public function updateMetaData(\Dam\Entities\Asset $asset)
    {
        $attachment = $asset->get('image') ?? $asset->get('file');

        $metaData = $this->getServiceFactory()->create("Attachment")->getFileMetaData($attachment);

        return $this->getServiceFactory()->create("AssetMetaData")->insertData("asset", $asset->id, $metaData);
    }

    public function getImageInfo(\Dam\Entities\Asset $asset)
    {
        $type = ConfigManager::getType($asset->get('type'));
        $nature = $this->getConfigManager()->get([$type, "nature"]);

        $attachment = $nature === "image" ? $asset->get("image") : $asset->get("file");
        $imageInfo = $this->getService("Attachment")->getImageInfo($attachment);

        $asset->set([
            "size" => round($imageInfo['size'] / 1024, 1),
            "sizeUnit" => "kb",
        ]);

        $attributesList = $this->getConfigManager()->get([$type, "attributes"]);

        $asset->set("attributes", json_encode(array_merge(
                json_decode(($asset->get("attributes") ?? "{}"), true),
                array_intersect_key($imageInfo, $attributesList))
        ));
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

    protected function getService($name)
    {
        return $this->getServiceFactory()->create($name);
    }
}
