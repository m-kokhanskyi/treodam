<?php

namespace Dam\Controllers;

use Espo\Core\Exceptions\NotFound;

class RenditionVersion extends \Espo\Core\Templates\Controllers\Base
{
    /**
     * @param $params
     * @param $data
     * @param $request
     * @throws NotFound
     */
    public function actionList($params, $data, $request)
    {
        throw new NotFound();
    }
}
