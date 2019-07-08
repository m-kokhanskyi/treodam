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

namespace Dam\Core\FileManager;

use Espo\Core\Container;
use Espo\Core\Exceptions\Error;
use Treo\Core\Utils\File\Manager;

/**
 * Class DAMFileManager
 *
 * @package Espo\Modules\Dam\Core\FileManager
 */
class DAMFileManager extends Manager
{
    /**
     * @var Container|null
     */
    protected $container = null;

    /**
     * DAMFileManager constructor.
     *
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        parent::__construct($this->container->get('config'));
    }

    /**
     * @param array|string $filePaths
     *
     * @return bool
     */
    public function unlink($filePaths)
    {
        if ($this->removeFile([$filePaths])) {
            return $this->removeEmptyDirs($filePaths);
        }

        return false;
    }

    /**
     * @param $oldPath
     * @param $newPath
     * @return bool
     * @throws Error
     */
    public function move($oldPath, $newPath): bool
    {
        if (!file_exists($oldPath)) {
            throw new Error("File not found");
        }

        if ($this->checkCreateFile($newPath) === false) {
            throw new Error('Permission denied for ' . $newPath);
        }

        if (!rename($oldPath, $newPath)) {
            return false;
        }
        $this->removeEmptyDirs($oldPath);

        return true;
    }
}
