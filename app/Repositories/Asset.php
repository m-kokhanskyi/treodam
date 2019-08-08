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

namespace Dam\Repositories;

use Dam\Core\DAMAttachment;
use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\Templates\Repositories\Base;
use Espo\ORM\Entity;

/**
 * Class Asset
 *
 * @package Dam\Repositories
 */
class Asset extends Base implements DAMAttachment
{
    /**
     * @param Entity $entity
     * @return array
     */
    public function buildPath(Entity $entity): array
    {
        return [
            ($entity->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "master/",
            $entity->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC
        ];
    }

    /**
     * @param Entity $entity
     * @param $data
     * @return mixed
     */
    public function saveImageInfo(Entity $entity, $data, $save = false)
    {
        $entity->set([
            "size" => round($data['size'] / 1024, 1),
            "sizeUnit" => "kb",
            "fileType" => $data['extension'],
            "width" => $data['width'] ?? null,
            "height" => $data['height'] ?? null,
            "colorSpace" => $data['color_space'] ?? null,
            "colorDepth" => $data['color_depth'] ?? null,
            "orientation" => $data['orientation'] ?? null
        ]);

        if ($save) {
            $this->save($entity);
        }
    }
}
