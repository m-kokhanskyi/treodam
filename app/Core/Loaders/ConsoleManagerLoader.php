<?php
declare(strict_types=1);
namespace Dam\Core\Loaders;

use Dam\Core\ConsoleManager;
use Treo\Core\Loaders\Base;

class ConsoleManagerLoader extends Base
{
    public function load()
    {
        return new ConsoleManager($this->getContainer());
    }
}