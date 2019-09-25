<?php

namespace Dam\Repositories;

class Collection extends \Espo\Core\Templates\Repositories\Base
{
    public function normalizedDefaultValue(string $id)
    {
        $entity = $this->where([
            'isDefault' => 1,
            "id!=" => $id
        ])->findOne();

        if ($entity) {
            $entity->set("isDefault", false);
            $this->save($entity);
        }
    }
}
