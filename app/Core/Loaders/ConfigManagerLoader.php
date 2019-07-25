<?php

declare(strict_types=1);
namespace Dam\Core\Loaders;


use Dam\Core\ConfigManager;
use Treo\Core\Loaders\Base;

class ConfigManagerLoader extends Base
{
    public function load()
    {
        return new ConfigManager($this->getContainer());
    }
}