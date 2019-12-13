<?php
/**
 * Dam
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
declare(strict_types=1);

namespace Dam\Core\Validation;

use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Treo\Core\Container;

/**
 * Class Validator
 * @package Dam\Core\Validation
 */
class Validator
{
    /**
     * @var array
     */
    private $instances = [];
    /**
     * @var Container
     */
    private $container;

    /**
     * Validator constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param string $validatorName
     * @param        $attachment
     * @param        $params
     * @throws BadRequest
     * @throws Error
     */
    public function validate(string $validatorName, $attachment, $params)
    {
        $className = $this->getMetadata()->get(['app', 'config', 'validations', 'classMap', $validatorName]);

        if (!$className || !class_exists($className)) {
            $className = __NAMESPACE__ . "\\Items\\" . ucfirst($validatorName);
        }

        if (!class_exists($className)) {
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

    /**
     * @return mixed
     */
    protected function getMetadata()
    {
        return $this->container->get('metadata');
    }
}