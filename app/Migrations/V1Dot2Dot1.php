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

namespace Dam\Migrations;

use Treo\Core\Migration\AbstractMigration;

/**
 * Class V1Dot2Dot1
 *
 * @author m.kokhanskyi <m.kokhanskyi@treolabs.com>
 */
class V1Dot2Dot1 extends AbstractMigration
{
    /**
     * @inheritdoc
     */
    public function up(): void
    {
        $this->migratePimImage();
    }

    /**
     * @throws \Espo\Core\Exceptions\Error
     */
    protected function migratePimImage()
    {
        $metadata = $this->getContainer()->get('metadata');
        $entityManager = $this->getContainer()->get('entityManager');

        if (MigrationPimImage::issetPimImage($metadata, $entityManager)) {
            $migrationPimImage = new MigrationPimImage();
            $migrationPimImage->setContainer($this->getContainer());

            $migrationPimImage->run();
        }
    }

    /**
     * @inheritdoc
     */
    public function down(): void
    {
    }
}
