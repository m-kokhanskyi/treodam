<?php


namespace Dam\Core\Validation;

use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Treo\Core\Container;

class Validator
{
    private $instances = [];
    private $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param string $validatorName
     * @param $attachment
     * @param $params
     * @throws BadRequest
     * @throws Error
     */
    public function validate(string $validatorName, $attachment, $params)
    {
        $className = __NAMESPACE__ . "\\Items\\" . ucfirst($validatorName);

        if (!class_exists($className)) {
            $className = $this->getMetadata()->get(['app', 'validation', 'classMap', $validatorName]);
        }

        if (!$className) {
            throw new BadRequest("Validator with name '{$validatorName}' not found");
        }

        if (!is_a($className, Base::class, true)) {
            throw new Error("Class must implements 'Base' validator");
        }

        if (!isset($this->instances[$className])) {
            $this->instances[$className] = new $className($this->container);
        }

        if (!$this->instances[$className]->setAttachment($attachment)->setParams($params)->validate()) {
            $this->instances[$className]->onValidateFail();
        }
    }

    protected function getMetadata()
    {
        return $this->container->get('metadata');
    }
}