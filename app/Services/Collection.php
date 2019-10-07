<?php

namespace Dam\Services;

class Collection extends \Espo\Core\Templates\Services\Base
{
    public function updateDefault($entity)
    {
        if ($entity->get("isDefault")) {
            $this->getRepository()->normalizedDefaultValue($entity->id);
        }
    }
}
