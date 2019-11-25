<?php
declare(strict_types=1);
namespace Dam\Controllers;

use Dam\Core\ConfigManager;

class DamConfig extends AbstractController
{
    public function actionRead($params, $data, $request)
    {
        return $this->getConfigManager()->getConfig();
    }

    protected function getConfigManager(): ConfigManager
    {
        return $this->getContainer()->get("ConfigManager");
    }
}