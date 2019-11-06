<?php
/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2018 Yuri Kuznetsov, Taras Machyshyn, Oleksiy Avramenko
 * Website: http://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/
declare(strict_types=1);

namespace Dam\EntryPoints;

use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\EntryPoints\Base;
use Espo\Core\Exceptions\BadRequest;

class Versions extends Base
{
    public static $authRequired = true;

    /**
     * @throws BadRequest
     */
    public function run()
    {
        if (!$type = $_GET['type']) {
            throw new BadRequest("'type' is required");
        }

        if (!$id = $_GET['id']) {
            throw new BadRequest("'id' is required");
        }

        if (!$event = $_GET['event']) {
            throw new BadRequest("'event' is required");
        }

        list($filePath, $fileName) = $this->getAttachmentInfo($id, $type);

        switch ($event) {
            case "download":
                return $this->download($filePath, $fileName);
                break;
            case "preview" :
                return $this->preview($filePath, $fileName);
                break;
        }

        exit;
    }

    protected function getAttachmentInfo($id, $type)
    {
        switch ($type) {
            case "asset":
                return $this->getAssetVersion($id);
                break;
            case "rendition" :
                return $this->getRenditionVersion($id);
                break;
        }

        return false;
    }

    /**
     * @param $id
     * @return array
     */
    protected function getAssetVersion($id)
    {
        $entity = $this->getEntityManager()->getEntity("AssetVersion", $id);

        $asset = $entity->get("asset");

        $path = $asset->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH;

        return [
            $path . "master/" . $asset->get("path") . "/" . $entity->get("name") . "/" . $entity->get("fileName"),
            $entity->get("fileName"),
        ];
    }

    protected function getRenditionVersion($id)
    {
        $entity = $this->getEntityManager()->getEntity("RenditionVersion", $id);

        $rendition = $entity->get("rendition");

        $path = $rendition->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH;

        return [
            $path . $rendition->get("type") . "/" . $rendition->get("path") . "/" . $entity->get("name") . "/" . $entity->get("fileName"),
            $entity->get("fileName"),
        ];
    }

    protected function download(string $path, string $fileName)
    {
        $outputFileName = str_replace("\"", "\\\"", $fileName);

        header('Content-Description: File Transfer');

        header("Content-Disposition: attachment;filename=\"" . $outputFileName . "\"");
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($path));

        readfile($path);
        exit;
    }


    protected function preview(string $path, string $fileName)
    {
        header('Content-Disposition:inline;filename="' . $fileName . '"');
        header('Pragma: public');
        header('Cache-Control: max-age=360000, must-revalidate');
        $fileSize = filesize($path);
        if ($fileSize) {
            header('Content-Length: ' . $fileSize);
        }
        readfile($path);
        exit;
    }
}
