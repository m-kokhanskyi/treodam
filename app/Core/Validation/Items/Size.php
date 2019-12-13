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

namespace Dam\Core\Validation\Items;

use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\Error;

/**
 * Class Size
 * @package Dam\Core\Validation\Items
 */
class Size extends Base
{
    /**
     * @return bool
     */
    public function validate(): bool
    {
        if ($this->skip()) {
            return true;
        }

        $imageSize = (filesize($this->attachment->get('tmpPath')) / 1024);

        if ($imageSize >= $this->params['min'] && $imageSize <= $this->params['max']) {
            return true;
        }

        return false;
    }

    /**
     * @throws Error
     */
    public function onValidateFail()
    {
        throw new Error("File size should not exceed from {$this->params['min']}kb to {$this->params['max']}kb");
    }
}