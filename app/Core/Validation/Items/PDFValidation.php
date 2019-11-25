<?php

declare(strict_types=1);
namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\BadRequest;

class PDFValidation extends Base
{

    public function validate(): bool
    {
        if ($this->skip()){
            return true;
        }

        $content = file_get_contents($this->attachment->get('tmpPath'));

        if (preg_match("/^%PDF-1./", $content)) {
            return true;
        }

        return false;
    }

    /**
     * @throws BadRequest
     */
    public function onValidateFail()
    {
        throw new BadRequest("Incorrect PDF document");
    }
}