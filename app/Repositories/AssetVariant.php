<?php

namespace Dam\Repositories;

use Dam\Core\DAMAttachment;
use Espo\ORM\Entity;

class AssetVariant extends \Espo\Core\Templates\Repositories\Base implements DAMAttachment
{
    public function buildPath(Entity $entity): array
    {
        $asset = $entity->get('asset');

        return $this->getEntityManager()->getRepository("Asset")->buildPath($asset);
    }
}
