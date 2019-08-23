<?php

declare(strict_types=1);
namespace Dam\Core\Rendition\Items;


use Treo\Core\Container;

abstract class Base
{
    protected $file;
    protected $container;
    protected $params;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param string $file
     * @return Base
     */
    public function setFile(string $file): Base
    {
        $this->file = $file;
        return $this;
    }

    /**
     * @param array $params
     * @return Base
     */
    public function setParams(array $params): Base
    {
        $this->params = $params;
        return $this;
    }

    abstract public function create();
}