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

        $userId = $this->getUser()->id;

        if (is_a($entity, Asset::class) || is_a($foreign, Asset::class)) {
            $this->getService("AssetRelation")->createLink($entity, $foreign, $userId);
        }
    }


    protected function getUser ()
    {
        return $this->getContainer()->get('user');
    }
}