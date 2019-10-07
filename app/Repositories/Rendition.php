<?php

namespace Dam\Repositories;

use Dam\Core\DAMAttachment;
use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
use Espo\ORM\Entity;

class Rendition extends \Espo\Core\Templates\Repositories\Base implements DAMAttachment
{
    public function buildPath(Entity $entity): array
    {
        return [
            ($entity->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "{$entity->get('type')}/",
            $entity->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC
        ];
    }

    public function checkExist(Entity $entity): bool
    {
        return $this->where([
            'id=' => $entity->id,
            "type" => $entity->get("type")
        ])->findOne() ? true : false;
    }
}
