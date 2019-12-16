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

namespace Dam\Core\Validation\Items;

use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\BadRequest;
use ReflectionClass;
use Treo\Core\Container;

/**
 * Class ColorSpace
 * @package Dam\Core\Validation\Items
 */
class ColorSpace extends Base
{
    /**
     * @var array|bool
     */
    private $map = [];

    /**
     * ColorSpace constructor.
     * @param Container $container
     * @throws \ReflectionException
     */
    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->map = $this->createMap();
    }

    /**
     * @return bool
     * @throws \ImagickException
     */
    public function validate(): bool
    {
        $img = new \Imagick($this->attachment->get('tmpPath'));

        $colorSpace = $img->getImageColorspace();

        return in_array($this->map[$colorSpace], $this->params);
    }

    /**
     * @throws BadRequest
     */
    public function onValidateFail()
    {
        throw new BadRequest("Color space must been in list " . implode(", ", $this->params));
    }

    /**
     * @return array|bool
     * @throws \ReflectionException
     */
    private function createMap()
    {
        if ($this->skip()) {
            return true;
        }

        $imagick = new ReflectionClass(\Imagick::class);
        $res     = [];
        foreach ($imagick->getConstants() as $constantName => $constantValue) {
            if (stripos($constantName, "COLORSPACE_") === false) {
                continue;
            }

            $res[$constantValue] = str_replace("COLORSPACE_", "", $constantName);
        }

        return $res;
    }
}