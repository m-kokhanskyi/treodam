<?php
declare(strict_types=1);

namespace Dam\Core\ORM\Query;


use Espo\ORM\EntityFactory;
use Espo\ORM\IEntity;
use PDO;

class DamQuery extends \Espo\ORM\DB\Query\Base
{
    public function __construct(PDO $pdo, EntityFactory $entityFactory)
    {
        parent::__construct($pdo, $entityFactory);
    }

    public function createSelectStatement(IEntity $entity, $fields = null, $distinct = false, $skipTextColumns = false, $maxTextColumnsLength = null)
    {
        return parent::getSelect($entity, $fields, $distinct, $skipTextColumns, $maxTextColumnsLength); // TODO: Change the autogenerated stub
    }

    public function limit($sql, $offset, $limit)
    {
        // TODO: Implement limit() method.
    }
}