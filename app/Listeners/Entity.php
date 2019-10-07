<?php


namespace Dam\Listeners;


use Dam\Entities\Asset;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

class Entity extends AbstractListener
{
    public function beforeRelate(Event $events)
    {
        $entity = $events->getArgument('entity');
        $foreign = $events->getArgument('foreign');

        if (is_string($foreign) && $relationName = $events->getArgument("relationName")) {
            $entityName = $entity->getRelations()[$relationName]['entity'];
            $foreign = $this->getEntityManager()->getEntity($entityName, $foreign);
        }

        $userId = $this->getUser()->id;

        if (is_a($entity, Asset::class) || is_a($foreign, Asset::class)) {
            $this->getService("AssetRelation")->createLink($entity, $foreign, $userId);
        }
    }

    public function afterSave(Event $event)
    {
        $entity = $event->getArgument("entity");
        $userId = $this->getUser()->id;

        if (is_a($entity, Asset::class)) {
            $this->getService("Asset")->assetRelation($entity, $userId);
        } else {
            $this->getService("Entity")->assetRelation($entity, $userId);
        }
    }

    protected function getUser()
    {
        return $this->getContainer()->get('user');
    }
}