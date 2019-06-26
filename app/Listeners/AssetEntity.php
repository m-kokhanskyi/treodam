<?php


namespace Dam\Listeners;


use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

class AssetEntity extends AbstractListener
{
    public function beforeSave(Event $event)
    {
        $entity = $event->getArgument('entity');

        $service = $this->getService('Attachment');
    }
}
