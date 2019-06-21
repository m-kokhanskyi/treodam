<?php
namespace Espo\Modules\Dam\Core\Loaders;


use Espo\Core\Loaders\Base;
use Espo\Modules\Dam\Core\FileManager\DAMFileManager;

class DAMFileManagerLoader extends Base
{

    public function load()
    {
        return new DAMFileManager($this->getContainer());
    }
}
