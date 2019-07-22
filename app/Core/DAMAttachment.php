<?php


namespace Dam\Core;

use Espo\ORM\Entity;

interface DAMAttachment
{
    public function buildPath(Entity $entity): array;
}