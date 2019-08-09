<?php


namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;

class CSVValidation extends Base
{
    public function validate(): bool
    {
        return true;
    }

    public function onValidateFail()
    {
        // TODO: Implement onValidateFail() method.
    }
}