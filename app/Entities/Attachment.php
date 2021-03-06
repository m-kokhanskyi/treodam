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

namespace Dam\Entities;

/**
 * Class Attachment
 *
 * @package Dam\Entities
 */
class Attachment extends \Treo\Entities\Attachment
{
    /**
     * @var string
     */
    protected $entityType = "Attachment";

    /**
     * @return string
     */
    public function _getStorage()
    {
        return $this->valuesContainer['storage'] ? $this->valuesContainer['storage'] : "DAMUploadDir";
    }

    /**
     * @param $name
     * @return $this
     */
    public function setName($name)
    {
        $baseFileInfo = pathinfo($this->get("name"));
        $this->set("name", $name . "." . $baseFileInfo['extension']);

        return $this;
    }
}
