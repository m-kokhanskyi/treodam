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

    /**
     * @return FileManager
     */
    protected function getFileManager(): FileManager
    {
        return $this->getInjection("DAMFileManager");
    }
}
