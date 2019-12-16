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

namespace Dam\Core\Utils;

use Imagick;
use ReflectionClass;
use Treo\Core\Utils\Random;

/**
 * Class Util
 * @package Dam\Core\Utils
 */
class Util extends \Treo\Core\Utils\Util
{
    /**
     * @param string $mask
     * @param array  $params
     * @return string
     */
    public static function createName(string $mask, array $params = []): string
    {
        $result = preg_replace_callback("/{{([^}}]+)}}/", function ($item) use ($params) {
            $item = $item[1];

            switch (true) {
                case stripos($item, "date") !== false :
                    $i = explode(":", $item);

                    return date($i[1]);
                    break;
                case stripos($item, "rand") !== false :
                    $i = explode(":", $item);

                    return Random::getString(isset($i[1]) ? (int)$i[1] : 5);
                    break;

                case stripos($item, "unique") !== false:
                    return uniqid();
                    break;
                default :
                    return $params[$item];
            }
        }, $mask);

        return preg_replace("/[\/\\\:*?\"<>|+.\s%!@]/", "", $result);
    }

    /**
     * @param Imagick $imagick
     * @return |null
     * @throws \ReflectionException
     */
    public static function getColorSpace(Imagick $imagick)
    {
        $colorId = $imagick->getImageColorspace();

        if (!$colorId) {
            return null;
        }

        foreach ((new ReflectionClass($imagick))->getConstants() as $name => $value) {
            if (stripos($name, "COLORSPACE_") !== false && $value == $colorId) {
                $el = explode("_", $name);
                array_shift($el);

                return implode("_", $el);
            }
        }

        return null;
    }
}