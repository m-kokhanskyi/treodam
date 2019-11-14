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

namespace Dam;

use Espo\Core\Utils\DataUtil;
use Treo\Core\Utils\Metadata;
use Treo\Core\ModuleManager\AbstractModule;

/**
 * Class Module
 *
 * @author r.ratsun <r.ratsun@treolabs.com>
 * @author d.talko <d.talko@treolabs.com>
 */
class Module extends AbstractModule
{
    /**
     * @inheritdoc
     */
    public static function getLoadOrder(): int
    {
        return 5119;
    }

    /**
     * Get Metadata
     * @return Metadata
     */
    protected function getMetadata(): Metadata
    {
        return $this->container->get('metadata');
    }

    /**
     * @inheritdoc
     */
    public function loadMetadata(\stdClass &$data)
    {
        $metadata = $this
            ->getObjUnifier()
            ->unify('metadata', $this->path . 'app/Resources/metadata', true);

        // checking if module PIM installed
        if ($this->getMetadata()->isModuleInstalled('PIM')) {
            unset($metadata->themes);
        }

        $data = DataUtil::merge($data, $metadata);

    }
}
