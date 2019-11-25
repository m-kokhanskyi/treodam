<?php
declare(strict_types=1);
namespace Dam\Core\Loaders;

use Dam\Core\Utils\EntityManager;
use Treo\Core\Loaders\Base;

class EntityManagerUtilLoader extends Base
{
    public function load()
    {
        return new EntityManager($this->getContainer());
    }
}