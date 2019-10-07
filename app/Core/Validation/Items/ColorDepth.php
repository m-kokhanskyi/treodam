<?php

declare(strict_types=1);
namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\BadRequest;

class ColorDepth extends Base
{

    public function validate(): bool
    {
        if ($this->skip()){
            return true;
        }

        $img = new \Imagick($this->attachment->get("tmpPath"));

        return in_array($img->getImageDepth(), $this->params);
    }

    public function onValidateFail()
    {
        throw new BadRequest("Color depth must been in list " . implode(", ", $this->params));
    }
}