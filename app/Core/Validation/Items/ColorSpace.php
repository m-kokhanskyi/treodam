<?php

declare(strict_types=1);

namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\BadRequest;
use ReflectionClass;
use Treo\Core\Container;

class ColorSpace extends Base
{
    private $map = [];

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->map = $this->createMap();
    }

    private function createMap()
    {
        $imagick = new ReflectionClass(\Imagick::class);
        $res = [];
        foreach ($imagick->getConstants() as $constantName => $constantValue) {
            if (stripos($constantName, "COLORSPACE_") === false) {
                continue;
            }

            $res[$constantValue] = str_replace("COLORSPACE_", "", $constantName);
        }

        return $res;
    }

    public function validate(): bool
    {
        $img = new \Imagick($this->attachment->get('tmpPath'));

        $colorSpace = $img->getImageColorspace();

        return in_array($this->map[$colorSpace], $this->params);
    }

    public function onValidateFail()
    {
        throw new BadRequest("Color space must been in list " . implode(", ", $this->params));
    }
}