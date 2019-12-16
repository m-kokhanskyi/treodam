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

namespace Dam\EntryPoints;

use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Core\PathInfo;
use Treo\Entities\Attachment;

/**
 * Class Image
 * @package Dam\EntryPoints
 */
class Image extends \Treo\EntryPoints\Image
{
    /**
     * @param Attachment $attachment
     * @param            $size
     * @return string
     */
    protected function getThumbPath($attachment, $size)
    {
        $related = $attachment->get("related");
        $path    = DAMUploadDir::BASE_THUMB_PATH;

        if (is_a($related, PathInfo::class)) {
            $path = DAMUploadDir::DAM_THUMB_PATH . $related->getMainFolder() . "/";
        }

        return $path . $attachment->get('storageFilePath') . "/{$size}/" . $attachment->get('name');
    }
}
