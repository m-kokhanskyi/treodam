<?php

declare(strict_types=1);
namespace Dam\Core\Validation\Items;

use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\Error;

class Extension extends Base
{

    public function validate(): bool
    {
        if ($this->skip()){
            return true;
        }

        return in_array(pathinfo($this->attachment->get('name'))['extension'], $this->params);
    }

    /**
     * @throws Error
     */
    public function onValidateFail()
    {
        throw new Error("Use only next extension ". implode(', ', $this->params));
    }
}