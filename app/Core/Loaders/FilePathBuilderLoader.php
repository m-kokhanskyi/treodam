<?php


namespace Dam\Core\Loaders;

use Dam\Core\FilePathBuilder;
use Treo\Core\Loaders\Base;

class FilePathBuilderLoader extends Base
{
    /**
     * @return FilePathBuilder
     */
    public function load()
    {
        return new FilePathBuilder($this->getContainer());
    }
}