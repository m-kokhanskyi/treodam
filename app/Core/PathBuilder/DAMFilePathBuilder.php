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

namespace Dam\Core\PathBuilder;

use Espo\Core\Container;
use Espo\Entities\Attachment;
use Espo\ORM\Metadata;

/**
 * Class DAMFilePathBuilder
 *
 * @package Espo\Modules\Dam\Core\PathBuilder
 */
class DAMFilePathBuilder implements PathBuilderInterface
{
    /**
     * @var Container|null
     */
    protected $container  = null;

    /**
     * DAMFilePathBuilder constructor.
     *
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @return string
     */
    public function createPath(): string
    {
        $md5 = md5((string)time());

        $depth         = $this->getMeta()->get('app.fileStorage.folderDepth') ?? 3;
        $elementLength = (int)floor(32 / $depth);

        for ($i = 1; $i < $depth; $i++) {
            $part[] = substr($md5, ($i - 1) * $elementLength, $elementLength);
        }
        $part[] = substr($md5, ($elementLength * ($depth - 1)));


        return implode('/', $part);
    }

    /**
     * @return Metadata|null
     */
    private function getMeta()
    {
        return $this->container->get('metadata');
    }
}
