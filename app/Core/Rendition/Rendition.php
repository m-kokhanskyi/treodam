<?php

declare(strict_types=1);

namespace Dam\Core\Rendition;


use Dam\Core\Rendition\Items\Base;
use Espo\Core\Exceptions\Error;
use Treo\Core\Container;

abstract class Rendition
{
    private static $instances = [];

    public static function init(string $handlerCode, Container $container) : Base
    {
        if (!isset(self::$instances[$handlerCode])) {
            $className = __NAMESPACE__ . "\\Items\\" . ucfirst($handlerCode);
            if (!class_exists($className)) {
                throw new Error("Class with name '{$handlerCode}' not found");
            }

            if (!is_a($className, Base::class, true)) {
                throw new Error("Class must implements 'Base' Rendition");
            }

            self::$instances[$handlerCode] = new $className($container);
        }

        return self::$instances[$handlerCode];
    }

}