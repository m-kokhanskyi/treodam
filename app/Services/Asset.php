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
     * @param \Dam\Entities\Asset $asset
     * @return mixed
     */
    public function createVersion(\Dam\Entities\Asset $asset)
    {
        $natural = ConfigManager::getType($asset->getFetched("type"));

        $attachmentId = $natural === "image" ? $asset->getFetched("imageId") : $asset->getFetched("fileId");

        $attachment = $this->getEntityManager()->getEntity("Attachment", $attachmentId);

        return $this->getServiceFactory()->create("AssetVersion")->createEntity($attachment);
    }

    public function createVariations(\Dam\Entities\Asset $asset)
    {
        $config = $this->getConfigManager()->get([ConfigManager::getType($asset->get("type")), "variations"]);

        foreach ($config ?? [] as $variationCode => $variationProps) {
            if ($variationProps['auto']) {

                //TODO add validation

                foreach ($variationProps['handlers'] ?? [] as $handlerCode => $handlerProps) {
                    $class = $handlerProps['class'] ?? \Dam\Core\Variations\Base::getClass($handlerCode);

                    if (class_exists($class) && is_a($class, \Dam\Core\Variations\Base::class, true)) {
                        $class::init($variationCode, $this->getEntityManager()->getContainer(), $asset)->create();
                    } else {
                        $this->getLog()->addWarning("Class '{$class}' not found or not implement Base class");
                    }
                }
            }
        }
    }

    public function updateMetaData(\Dam\Entities\Asset $asset)
    {
        $attachment = $asset->get('image') ?? $asset->get('file');

        $metaData = $this->getServiceFactory()->create("Attachment")->getFileMetaData($attachment);

        return $this->getServiceFactory()->create("AssetMetaData")->insertData($asset->id, $metaData);
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
}
