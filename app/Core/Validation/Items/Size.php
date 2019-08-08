<?php

declare(strict_types=1);
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

        return ($this->params * 1024 * 1024) > filesize($this->attachment->get("tmpPath"));
    }

    /**
     * @throws Error
     */
    public function onValidateFail()
    {
        throw new Error("File size should not exceed {$this->params}Mb.");
    }
}