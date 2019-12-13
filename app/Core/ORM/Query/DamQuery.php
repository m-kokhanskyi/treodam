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

namespace Dam\Core\ORM\Query;

use Espo\ORM\EntityFactory;
use Espo\ORM\IEntity;
use PDO;

/**
 * Class DamQuery
 * @package Dam\Core\ORM\Query
 */
class DamQuery extends \Espo\ORM\DB\Query\Base
{
    /**
     * DamQuery constructor.
     * @param PDO           $pdo
     * @param EntityFactory $entityFactory
     */
    public function __construct(PDO $pdo, EntityFactory $entityFactory)
    {
        parent::__construct($pdo, $entityFactory);
    }

    /**
     * @param IEntity $entity
     * @param null    $fields
     * @param bool    $distinct
     * @param bool    $skipTextColumns
     * @param null    $maxTextColumnsLength
     * @return mixed
     */
    public function createSelectStatement(
        IEntity $entity,
        $fields = null,
        $distinct = false,
        $skipTextColumns = false,
        $maxTextColumnsLength = null
    )
    {
        return parent::getSelect($entity, $fields, $distinct, $skipTextColumns, $maxTextColumnsLength);
    }

    /**
     * @param $sql
     * @param $offset
     * @param $limit
     */
    public function limit($sql, $offset, $limit)
    {
        // TODO: Implement limit() method.
    }

    /**
     * @param IEntity $entity
     * @param null    $select
     * @param array   $skipList
     * @return mixed
     */
    public function buildJoins(IEntity $entity, $select = null, $skipList = [])
    {
        return $this->getBelongsToJoins($entity, $select, $skipList);
    }
}