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

namespace Dam\EntryPoints;

use Dam\Core\FileStorage\DAMUploadDir;
use Espo\Core\EntryPoints\Base;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\ORM\Entity;

class Versions extends Base
{
    public static $authRequired = true;

    /**
     * @throws BadRequest
     * @throws Error
     * @throws Forbidden
     */
    public function run()
    {
        if (!$assetId = $_GET['assetId']) {
            throw new BadRequest("'assetId' is required");
        }

        if (!$time = $_GET['time']) {
            throw new BadRequest("'time' is required");
        }

        $version = $this->getEntityManager()->getRepository("AssetVersion")->where([
            'name' => $time,
            'assetId' => $assetId
        ])->findOne();

        if (!$this->getAcl()->checkEntity($version->get('asset'))) {
            throw new Forbidden();
        }

        $filePath = $this->getFilePath($version);

        if (!file_exists($filePath)) {
            throw new Error("File not found");
        }

        $outputFileName = $version->get('fileName');
        $outputFileName = str_replace("\"", "\\\"", $outputFileName);

        $disposition = 'attachment';


        header('Content-Description: File Transfer');
        header("Content-Disposition: " . $disposition . ";filename=\"" . $outputFileName . "\"");
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($filePath));

        readfile($filePath);
        exit;
    }

    protected function getFilePath(Entity $entity)
    {
        $asset = $entity->get('asset');
        $path = $asset->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH;
        return $path . $asset->get('path') . '/' . $entity->get('name') . "/" . $entity->get('fileName');
    }


}
