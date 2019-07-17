<?php


namespace Dam\Core\Validation;

use Treo\Core\Container;

abstract class Base
{
    protected $params;
    protected $container;
    protected $attachment;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function setAttachment($attachment)
    {
        $this->attachment = $attachment;

        return $this;
    }

    public function setParams($params)
    {
        $this->params = $params;

        return $this;
    }

    abstract public function validate(): bool;

    abstract public function onValidateFail();
}