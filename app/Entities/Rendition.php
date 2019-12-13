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
 * Class Rendition
 * @package Dam\Entities
 */
class Rendition extends Base implements PathInfo
{
    /**
     * @var bool
     */
    public $isAutoCreated = false;
    /**
     * @var string
     */
    protected $entityType = "Rendition";

    /**
     * @return array
     */
    public function getPathInfo(): array
    {
        return [
            ($this->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "{$this->get('type')}/",
            $this->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC,
        ];
    }

    /**
     * @return string
     */
    public function getMainFolder(): string
    {
        return $this->get("type");
    }
}
