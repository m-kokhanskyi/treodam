<?php


namespace Dam\Listeners;


use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

class Entity extends AbstractListener
{
    public function beforeRelate(Event $events)
    {
        $r = 1;
    }
}