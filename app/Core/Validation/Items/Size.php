<?php


namespace Dam\Core\Validation\Items;

use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\Error;

class Size extends Base
{
    public function validate(): bool
    {
        if ($this->skip()){
            return true;
        }

        return ($this->params * 1024 * 1024) > mb_strlen($this->attachment->contents, '8bit');
    }

    /**
     * @throws Error
     */
    public function onValidateFail()
    {
        throw new Error("File size should not exceed {$this->params}Mb.");
    }
}