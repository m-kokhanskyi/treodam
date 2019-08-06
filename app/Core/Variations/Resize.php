<?php

declare(strict_types=1);

namespace Dam\Core\Variations;


use Dam\Core\ConfigManager;

class Resize extends Base
{
    public function create(): bool
    {
        $type = ConfigManager::getType($this->entity->get('type'));
        $config = $this->container->get("ConfigManager")->get([$type, 'variations', $this->code]);

        if (!$config['auto']) {
            return true;
        }

        return $this->resize();
    }


    protected function resize(): bool
    {
        $image = $this->getImagePath();
    }

    protected function getImagePath()
    {

    }


}