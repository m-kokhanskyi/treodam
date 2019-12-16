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
use Dam\Repositories\Attachment;
use Espo\Core\Exceptions\BadRequest;

/**
 * Class Unique
 * @package Dam\Core\Validation\Items
 */
class Unique extends Base
{
    /**
     * @return bool
     */
    public function validate(): bool
    {
        if ($this->skip()) {
            return true;
        }

        $md5 = md5(file_get_contents($this->attachment->get("tmpPath")));

        /**@var $repository Attachment* */
        $count = $this->getRepository("Attachment")
                      ->where([
                          'hash_md5'    => $md5,
                          'deleted'     => 0,
                          'relatedId!=' => null,
                          'createdById' => $this->getUser()->id,
                      ])->count();

        return $count == 0;
    }

    /**
     * @throws BadRequest
     */
    public function onValidateFail()
    {
        throw new BadRequest("Duplicate file");
    }
}