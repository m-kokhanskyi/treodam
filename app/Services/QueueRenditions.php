<?php


namespace Dam\Services;

use Treo\Services\QueueManagerBase;

class QueueRenditions extends QueueManagerBase
{
    public function run(array $data = []): bool
    {
        $entity = $this->getEntityManager()->getEntity("Asset", $data['entityId']);
        if (!$entity) {
            return true;
        }

        return $this->getService("Rendition")->buildRenditions($entity);
    }

    protected function getService($name)
    {
        return $this->getContainer()->get("serviceFactory")->create($name);
    }
}