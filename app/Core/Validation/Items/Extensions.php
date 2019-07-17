<?php


namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\Error;

class Extensions extends Base
{

    public function validate(): bool
    {
        return in_array(pathinfo($this->attachment->name)['extension'], $this->params);
    }

    /**
     * @throws Error
     */
    public function onValidateFail()
    {
        throw new Error("Use only next extension ". implode(', ', $this->params));
    }
}