<?php

declare(strict_types=1);

namespace Dam\Core\Variations;


use Espo\Core\Exceptions\Error;
use Espo\ORM\Entity;
use Treo\Core\Container;

abstract class Base
{
    protected $entity;
    protected $code;
    protected $container;
    private static $instances = [];

    /**
     * @param string $code
     * @param Container $container
     * @param Entity $entity
     * @return mixed
     */
    public static function init(string $code, Container $container, Entity $entity)
    {
        if (!isset(self::$instances[$code])) {
            self::$instances[$code] = new static();
        }

        self::$instances[$code]->entity = $entity;
        self::$instances[$code]->code = $code;
        self::$instances[$code]->container = $container;

        return self::$instances[$code];
    }

    public static function getClass(string $handlerCode)
    {
        return  __NAMESPACE__ . "\\". ucfirst($handlerCode);
    }

    abstract public function create(): bool;
}