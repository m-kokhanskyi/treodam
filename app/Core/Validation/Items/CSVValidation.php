<?php
declare(strict_types=1);

namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;

class CSVValidation extends Base
{
    public function validate(): bool
    {
        if ($this->skip()){
            return true;
        }

        return true;
    }

    public function onValidateFail()
    {
        // TODO: Implement onValidateFail() method.
    }
}