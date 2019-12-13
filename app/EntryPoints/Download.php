<?php
/**
 * Dam
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

declare(strict_types=1);

namespace Dam\EntryPoints;

use Dam\Core\Download\Custom;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;
use Imagick;

/**
 * Class Download
 * @package Dam\EntryPoints
 */
class Download extends \Espo\EntryPoints\Download
{
    /**@var Imagick * */
    protected $image = null;

    /**
     * Run download method
     */
    public function run()
    {
        switch ($_GET['type']) {
            case "custom" :
                $this->custom();
                break;
            default:
                parent::run();
        }
    }

    /**
     * @throws \ImagickException
     */
    protected function custom()
    {
        $attachment = $this->getAttachment();

        $filePath = $this->getEntityManager()->getRepository('Attachment')->getFilePath($attachment);

        if (!file_exists($filePath)) {
            throw new NotFound();
        }

        $file = (new Custom($filePath))
            ->setAttachment($attachment)
            ->setParams($_GET)
            ->convert();

        $type = $file->getType();

        header('Content-Description: File Transfer');
        if ($type) {
            header('Content-Type: ' . $type);
        }
        header("Content-Disposition: attachment;filename=\"" . $file->getName() . "\"");
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . $file->getImageSize());

        echo $file->getImage();
        exit;
    }

    /**
     * @return mixed
     */
    protected function getAttachment()
    {
        if (empty($_GET['id'])) {
            throw new BadRequest();
        }
        $id = $_GET['id'];

        $attachment = $this->getEntityManager()->getEntity('Attachment', $id);

        if (!$attachment) {
            throw new NotFound();
        }

        if (!$this->getAcl()->checkEntity($attachment)) {
            throw new Forbidden();
        }

        return $attachment;
    }

}