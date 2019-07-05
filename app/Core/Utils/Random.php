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

/**
 * Class Random
 *
 * @package Dam\Core\Utils
 */
class Random
{
    const CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz";

    /**
     * @param int $length
     *
     * @return string
     */
    public static function getString(int $length): string
    {
        $string    = '';
        $strLength = strlen(self::CHARACTERS);

        for ($i = 0; $i < $length; $i++) {
            $string .= self::CHARACTERS[rand(0, $strLength)];
        }

        return $string;
    }
}
