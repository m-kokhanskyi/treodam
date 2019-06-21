<?php


namespace Espo\Modules\Dam\Core\Loaders;


use Espo\Core\Loaders\Base;
use Espo\Modules\Dam\Core\PathBuilder\DAMFilePathBuilder;

class DAMFilePathBuilderLoader extends Base
{
    public function load()
    {
        return new DAMFilePathBuilder($this->getContainer());
    }
}
