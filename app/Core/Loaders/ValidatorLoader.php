<?php


namespace Dam\Core\Loaders;


use Dam\Core\Validation\Validator;
use Treo\Core\Loaders\Base;

class ValidatorLoader extends Base
{
    /**
     * @return Validator
     */
    public function load()
    {
        return new Validator($this->getContainer());
    }
}