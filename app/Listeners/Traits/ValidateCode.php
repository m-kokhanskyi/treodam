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

namespace Dam\Listeners\Traits;

use Espo\Core\ORM\Entity;
use Treo\Core\EventManager\Event;

/**
 * Trait ValidateCode
 *
 * @package Dam\Listeners\Traits
 */
trait ValidateCode
{
    /**
     * @var string
     */
    private $pattern = '/^[a-z0-9_]*$/';

    /**
     * @param Entity $entity
     *
     * @return bool
     */
    protected function isValidCode(Entity $entity): bool
    {
        $result = false;

        if (!empty($entity->get('code')) && preg_match($this->pattern, $entity->get('code'))) {
            $result = $this->isUnique($entity, 'code');
        }

        return $result;
    }

    /**
     * @param $entity
     * @param $field
     *
     * @return bool
     */
    protected function isUnique($entity, $field)
    {
        $repository = $this->getEntityManager()
                           ->getRepository($entity->getEntityName());

        return $repository->where([
            [$field => $entity->get($field)],
            ["id!=" => $entity->get("id")],
        ])->findOne() ? false : true;

    }
}
