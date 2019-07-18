<?php


namespace Dam\Core\Validation;

use Treo\Core\Container;
use Treo\Core\ORM\EntityManager;

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

    protected function getEntityManager(): EntityManager
    {
        return $this->container->get('entityManager');
    }

    protected function getRepository(string $name)
    {
        return $this->getEntityManager()->getRepository($name);
    }

    protected function getUser()
    {
        return $this->container->get('user');
    }
}