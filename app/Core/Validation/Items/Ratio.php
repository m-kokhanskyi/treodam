<?php

declare(strict_types=1);

namespace Dam\Core\Validation\Items;

use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\BadRequest;

class Ratio extends Base
{
    public function validate(): bool
    {
        $imageParams = getimagesize($this->attachment->get('tmpPath'));

        return ($imageParams[0] / $imageParams[1]) == $this->params;
    }

    public function onValidateFail()
    {
        throw new BadRequest("Image must have ratio {$this->params}");
    }
}