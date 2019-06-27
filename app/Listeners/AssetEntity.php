<?php
/** Dam
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

namespace Dam\Listeners;

use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetEntity
 *
 * @package Dam\Listeners
 */
class AssetEntity extends AbstractListener
{
    /**
     * @param Event $event
     */
    public function beforeSave(Event $event)
    {
        $entity  = $event->getArgument('entity');
        $service = $this->getService('Attachment');

        if ($fileId = $this->getImageId($entity)) {
            $imageInfo = $service->getImageInfo($this->getImageId($entity));

            $entity->set([
                "size"        => $imageInfo['size'],
                "fileType"    => $imageInfo['extension'],
                "width"       => $imageInfo['width'] ?? null,
                "height"      => $imageInfo['height'] ?? null,
                "colorSpace"  => $imageInfo['color_space'] ?? null,
                "colorDepth"  => $imageInfo['color_depth'] ?? null,
                "orientation" => $imageInfo['orientation'] ?? null,
            ]);
        }
    }

    /**
     * @param $entity
     *
     * @return string|null
     */
    private function getImageId($entity): ?string
    {
        $type = $entity->get("type");

        switch (true) {
            case $type == "Image":
                $id = $entity->get('imageId');
                break;
            default:
                $id = $entity->get('fileId');
        }

        return $id;
    }
}
