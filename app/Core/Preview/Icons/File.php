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

namespace Dam\Core\Preview\Icons;

use Dam\Core\Preview\Base;

/**
 * Class File
 * @package Dam\Core\Preview\Icons
 */
class File extends Base
{
    const ICON_PATH = "app/Data/PreviewIcons/";

    protected $type = "file";

    /**
     * @return mixed|void
     */
    public function show()
    {
        $icon = $this->getIconContent();

        header('Content-Type: image/svg+xml');
        header('Pragma: public');
        header('Cache-Control: max-age=360000, must-revalidate');
        header('Content-Length: ' . mb_strlen($icon, "8bit"));

        echo $icon;
        exit;
    }

    protected function getIconPath()
    {
        $modulePath = $this->getModuleManager()->getModule("Dam")->getPath();

        return $modulePath . self::ICON_PATH . "{$this->type}_icon.svg";
    }


    protected function getIconContent()
    {
        $iconPath = $this->getIconPath();

        return file_get_contents($iconPath);
    }
}