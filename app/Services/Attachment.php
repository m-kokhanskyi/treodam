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

use Espo\Core\Exceptions\NotFound;

/**
 * Class Attachment
 *
 * @package Dam\Services
 */
class Attachment extends \Espo\Services\Attachment
{
    /**
     * @param $id
     *
     * @return array
     * @throws NotFound
     */
    public function getImageInfo($id): array
    {
        if (!$attachment = $this->getEntityManager()->getEntity('Attachment', $id)) {
            throw new NotFound();
        }

        $path   = $this->getRepository()->getFilePath($attachment);
        $result = [];

        if ($imageInfo = getimagesize($path)) {
            $result = [
                "width"       => $imageInfo[0],
                "height"      => $imageInfo[1],
                "color_space" => is_null($imageInfo['channels'] ?? null) ? null : ($imageInfo['channels'] == 3 ? "RGB" : "CMYK"),
                "color_depth" => $imageInfo['bits'] ?? null,
                'orientation' => $this->getPosition($imageInfo[0], $imageInfo[1]),
                'mime'        => $imageInfo['mime'] ?? null,
            ];
        }

        if ($pathInfo = pathinfo($path)) {
            $result['extension'] = $pathInfo['extension'];
            $result['base_name'] = $pathInfo['basename'];
        }

        $result['size'] = filesize($path);

        return $result;
    }

    /**
     * @param $width
     * @param $height
     *
     * @return string
     */
    private function getPosition($width, $height): string
    {
        $result = "Square";

        if ($width > $height) {
            $result = "Landscape";
        } elseif ($width < $height) {
            $result = "Portrait";
        }

        return $result;
    }
}
