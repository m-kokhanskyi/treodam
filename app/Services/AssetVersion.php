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

namespace Dam\Services;

use Espo\Core\Exceptions\Error;
use Espo\Core\Templates\Services\Base;
use Treo\Core\FileStorage\Manager;

class AssetVersion extends Base
{
    /**
     * @param $attachment
     * @return mixedh
     * @throws Error
     * @throws \Espo\Core\Exceptions\BadRequest
     * @throws \Espo\Core\Exceptions\Forbidden
     */
    public function createEntity($attachment)
    {
        if (!is_a($attachment, \Dam\Entities\Attachment::class)) {
            throw new Error("Unsupported data");
        }

        /**@var $asset \Dam\Entities\Asset * */
        $asset = $attachment->get('related');

        if (!$asset || !is_a($asset, \Dam\Entities\Asset::class)) {
            return false;
        }

        if ($asset->get('type') === 'Image') {
            $currentAttachment = $asset->get("image");
        } else {
            $currentAttachment = $asset->get("file");
        }

        if (!isset($currentAttachment) || !$currentAttachment) {
            return false;
        }

        $filePath = $this->getFileStoreManager()->getLocalFilePath($currentAttachment);

        $path = pathinfo($filePath);
        $destPath = $this->buildDestPath($path['dirname'], $attachment);

        $filePath = $this->getFileStoreManager()->getLocalFilePath($attachment);

        if ($this->getFileManager()->copy($filePath, $destPath, false, null, true)) {
            return parent::createEntity((object)[
                'name' => $this->createNameFromDate($asset->get('createdAt')),
                'assetId' => $asset->id,
                "fileName" => $attachment->get('name'),
            ]);
        }

        return false;
    }

    /**
     * @return Manager
     */
    protected function getFileStoreManager(): Manager
    {
        return $this->getInjection("fileStorageManager");
    }

    /**
     * @param string $dirname
     * @param $entity
     * @return string
     */
    protected function buildDestPath(string $dirname, $entity)
    {
        $timeDir = $this->createNameFromDate($entity->get("createdAt"));

        return $dirname . "/" . $timeDir;
    }

    /**
     * @param $date
     * @return string|string[]|null
     */
    private function createNameFromDate($date)
    {
        return preg_replace("/[-:\s]+/", "", $date);
    }
}
