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

namespace Dam\Hooks\Asset;

use Espo\Core\Hooks\Base;
use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;

/**
 * Class AssetHook
 *
 * @author r.ratsun@treolabs.com
 */
class AssetHook extends Base
{
    /**
     * @param Entity $entity
     * @param array  $params
     *
     * @throws BadRequest
     */
    public function beforeSave(Entity $entity, $params = [])
    {
        if (!$this->isCodeValid($entity)) {
            throw new BadRequest($this->exception('Code is invalid'));
        }

        if (!$this->isUnique($entity)) {
            throw new BadRequest($this->exception('Such asset is already exists'));
        }
    }

    /**
     * @param Entity $entity
     *
     * @return bool
     */
    protected function isCodeValid(Entity $entity): bool
    {
        // prepare result
        $result = false;

        if (!empty($entity->get('code')) && preg_match('/^[a-z0-9_]*$/', $entity->get('code'))) {
            $result = true;
        }

        return $result;
    }

    /**
     * @param Entity $entity
     *
     * @return bool
     */
    protected function isUnique(Entity $entity): bool
    {
        $count = $this
            ->getEntityManager()
            ->getRepository('Asset')
            ->where(['id!=' => $entity->get('id'), 'name' => $entity->get('code')])
            ->count();

        return empty($count);
    }

    /**
     * @inheritdoc
     */
    protected function init()
    {
        // parent init
        parent::init();

        $this->addDependency('language');
    }

    /**
     * @inheritdoc
     */
    protected function exception(string $key): string
    {
        return $this->getInjection('language')->translate($key, 'exceptions', 'Asset');
    }
}
