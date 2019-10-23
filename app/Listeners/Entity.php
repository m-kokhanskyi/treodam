<?php


namespace Dam\Listeners;


use Dam\Entities\Asset;
use Espo\Core\Exceptions\BadRequest;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

class Entity extends AbstractListener
{
    public function beforeRelate(Event $event)
    {
        $entity  = $event->getArgument('entity');
        $foreign = $event->getArgument('foreign');

        if (is_string($foreign) && $relationName = $event->getArgument("relationName")) {
            $entityName = $entity->getRelations()[$relationName]['entity'];
            $foreign    = $this->getEntityManager()->getEntity($entityName, $foreign);
        }

        $userId = $this->getUser()->id;
        $assetEntity = is_a($entity, Asset::class) ? $entity : $foreign;
        if (!$assetEntity->get("isActive")) {
            throw new BadRequest($this->getLanguage()->translate("CantAddInActive", 'exceptions', 'Asset'));
        }

        if (is_a($entity, Asset::class) || is_a($foreign, Asset::class)) {
            $this->getService("AssetRelation")->createLink($entity, $foreign, $userId);
        }
    }

    public function afterUnrelate(Event $event)
    {
        $entity  = $event->getArgument('entity');
        $foreign = $event->getArgument('foreign');

        if (is_string($foreign) && $relationName = $event->getArgument("relationName")) {
            $entityName = $entity->getRelations()[$relationName]['entity'];
            $foreign    = $this->getEntityManager()->getEntity($entityName, $foreign);
        }

        if (is_a($entity, Asset::class) || is_a($foreign, Asset::class)) {
            $this->getService("AssetRelation")->deleteLink($entity, $foreign);
        }
    }

    public function afterSave(Event $event)
    {
        $entity = $event->getArgument("entity");
        $userId = $this->getUser()->id;

        if (!$userId) {
            return false;
        }

        if (is_a($entity, Asset::class)) {
            $this->getService("Asset")->assetRelation($entity, $userId);
        } else {
            $this->getService("Entity")->assetRelation($entity, $userId);
        }
    }

    public function afterRemove(Event $event)
    {
        $entity = $event->getArgument("entity");

        if (is_a($entity, Asset::class)) {
            $this->getService("Asset")->deleteLinks($entity);
        } else {
            $this->getService("Entity")->deleteLinks($entity);
        }
    }

    protected function getUser()
    {
        return $this->getContainer()->get('user');
    }
}