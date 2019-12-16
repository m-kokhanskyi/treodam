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

namespace Dam\Entities;

use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Core\PathInfo;
use Espo\Core\Templates\Entities\Base;

/**
 * Class Asset
 *
 * @package Dam\Entities
 */
class Asset extends Base implements PathInfo
{
    /**
     * @var string
     */
    protected $entityType = "Asset";

    /**
     * @return array
     */
    public function getPathInfo(): array
    {
        return [
            ($this->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "master/",
            $this->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC,
        ];
    }

    /**
     * @return string
     */
    public function getMainFolder(): string
    {
        return "master";
    }

    /**
     * @return array
     */
    public static function staticRelations()
    {
        return [
            'renditions',
            'collection',
            'assetMetaDatas',
            'assetVersions',
            'createdBy',
            'modifiedBy',
            'assignedUser',
            'teams',
            'file',
            'assetCategories',
            'ownerUser',
        ];
    }
}
