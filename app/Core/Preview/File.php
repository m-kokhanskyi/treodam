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

namespace Dam\Core\Preview;

/**
 * Class File
 * @package Dam\Core\Preview
 */
class File extends Base
{
    /**
     * @var string
     */
    protected $icon = "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";

    /**
     * @return mixed|void
     */
    public function show()
    {
        header('Content-Disposition:inline;filename="file.png"');
        header('Content-Type: image/png');
        header('Pragma: public');
        header('Cache-Control: max-age=360000, must-revalidate');
        header('Content-Length: ' . mb_strlen(base64_decode($this->icon), "8bit"));

        echo base64_decode($this->icon);
        exit;
    }
}