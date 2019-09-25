<?php

declare(strict_types=1);

namespace Dam\Core\Loaders;


use Dam\Core\ImageResize;
use Treo\Core\Loaders\Base;

class ImageResizeLoader extends Base
{
    public function load()
    {
        return new ImageResize();
    }
}