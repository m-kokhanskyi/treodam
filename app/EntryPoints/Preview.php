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

use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;
use Treo\Core\EntryPoints\AbstractEntryPoint;

/**
 * Class Preview
 * @package Dam\EntryPoints
 */
class Preview extends AbstractEntryPoint
{
    /**
     * @var bool
     */
    public static $authRequired = true;

    /**
     * @throws BadRequest
     * @throws Forbidden
     * @throws NotFound
     */
    public function run()
    {
        if (empty($_GET['id'])) {
            throw new BadRequest();
        }
        $id   = $_GET['id'];
        $type = $_GET['type'] ?? "asset";

        $size = null;
        if (!empty($_GET['size'])) {
            $size = $_GET['size'];
        }

        $this->show($id, $type, $size);
    }

    /**
     * @param $id
     * @param $type
     * @param $size
     * @return mixed
     */
    public function show($id, $type, $size)
    {
        $attachment = $this->getAttachment($type, $id);

        if (!$attachment) {
            throw new NotFound();
        }

        if (!$this->getAcl()->checkEntity($attachment)) {
            throw new Forbidden();
        }

        return \Dam\Core\Preview\Base::init($attachment, $size, $this->getContainer())->show();
    }

    /**
     * @param $type
     * @param $id
     * @return mixed
     */
    private function getAttachment($type, $id)
    {
        switch ($type) {
            case "attachment" :
                return $this->getEntityManager()->getEntity("Attachment", $id);
                break;
            case "asset":
            default:
                $asset = $this->getEntityManager()->getEntity("Asset", $id);

                return $asset->get("file");
        }

    }
}