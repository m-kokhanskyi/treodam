<?php

namespace Dam\Controllers;

use Dam\Controllers\AbstractController;
use Espo\Core\Exceptions;
use Treo\Core\Slim\Http\Request;

class AssetRelation extends AbstractController
{
    /**
     * @param $params
     * @param $data
     * @param Request $request
     * @return mixed
     * @throws \Espo\Core\Exceptions\BadRequest
     * @throws \Espo\Core\Exceptions\Forbidden
     */
    public function actionItemsInEntity($params, $data, Request $request)
    {
        $typesList = $this->getMetadata()->get(["entityDefs", "Asset", "fields", "type", "options"]);
        $list = array_intersect($typesList, explode(',', $request->get("list")));

        if (!$this->isReadAction($request) || !$list) {
            throw new Exceptions\BadRequest("List can't be empty");
        }

        $list = $this->getRecordService()->getItemsInList($list, $params['entity_name'], $params['entity_id']);

        return [
            "list" => $list,
            "count" => count($list)
        ];
    }

    public function actionByEntity($params, $data, Request $request)
    {
        if (!$this->isReadAction($request)) {
            throw new Exceptions\Error();
        }

        return [
            'list' => $this->getRecordService()->getItems($params['entity_id'], $params['entity_name'], $request->get("type"))
        ];
    }

    public function actionSortOrder($params, $data, Request $request)
    {
        if (!$request->isPut()) {
            throw new Exceptions\BadRequest();
        }

        if (!$this->getAcl()->check($this->name, 'edit')) {
            throw new Exceptions\Forbidden();
        }

        return $this
            ->getRecordService()
            ->updateSortOrder($params["entity_name"], $params['entity_id'], $data->ids);
    }
}
