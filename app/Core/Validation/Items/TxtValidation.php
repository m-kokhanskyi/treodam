<?php

declare(strict_types=1);
namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;

class TxtValidation extends Base
{


    public function validate(): bool
    {
        if ($this->skip()){
            return true;
        }

        $content = file_get_contents($this->attachment->get('tmpPath'));

        var_dump(ctype_print($content));
    }

    public function onValidateFail()
    {
        // TODO: Implement onValidateFail() method.
    }
}