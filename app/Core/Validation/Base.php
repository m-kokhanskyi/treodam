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

use Treo\Core\Container;
use Treo\Core\ORM\EntityManager;

/**
 * Class Base
 * @package Dam\Core\Validation
 */
abstract class Base
{
    /**
     * @var
     */
    protected $params;
    /**
     * @var Container
     */
    protected $container;
    /**
     * @var
     */
    protected $attachment;

    /**
     * Base constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param $attachment
     * @return $this
     */
    public function setAttachment($attachment)
    {
        $this->attachment = $attachment;

        return $this;
    }

    /**
     * @param $params
     * @return $this
     */
    public function setParams($params)
    {
        $this->params = $params;

        return $this;
    }

    /**
     * @return bool
     */
    abstract public function validate(): bool;

    /**
     * @return mixed
     */
    abstract public function onValidateFail();

    /**
     * @return EntityManager
     */
    protected function getEntityManager(): EntityManager
    {
        return $this->container->get('entityManager');
    }

    /**
     * @param string $name
     * @return mixed
     */
    protected function getRepository(string $name)
    {
        return $this->getEntityManager()->getRepository($name);
    }

    /**
     * @return mixed
     */
    protected function getUser()
    {
        return $this->container->get('user');
    }

    /**
     * @return bool
     */
    protected function skip()
    {
        if ($this->params['skip'] ?? false) {
            return true;
        }

        return false;
    }

    /**
     * @param string $label
     * @param string $category
     * @param string $scope
     */
    protected function translate(string $label, string $category, string $scope)
    {
        $this->container->get("language")->translate($label, $category, $scope);
    }

}