<?php

declare(strict_types=1);
namespace Dam\Core\Loaders;


use Dam\Core\FileManager;
use Treo\Core\Loaders\Base;

class FileManagerLoader extends Base
{

    public function load()
    {
        return new FileManager($this->getContainer()->get('config'));
    }
}