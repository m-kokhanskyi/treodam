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

use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Entities\Attachment;
use Espo\Core\Exceptions\Error;
use Gumlet\ImageResize;
use Treo\Core\Container;

/**
 * Class Base
 * @package Dam\Core\Preview
 */
abstract class Base
{
    /**
     * @var Attachment
     */
    protected $attachment;
    /**
     * @var string
     */
    protected $size;
    /**
     * @var Container
     */
    protected $container;

    const MAPPING = [
        "application/pdf" => Pdf::class,
        "image/gif"       => Image::class,
        "image/jpeg"      => Image::class,
        "image/png"       => Image::class,
    ];

    /**
     * @var $imageSizes
     */
    protected $imageSizes;

    /**
     * Base constructor.
     * @param Attachment $attachment
     * @param string     $size
     * @param Container  $container
     */
    public function __construct(Attachment $attachment, string $size, Container $container)
    {
        $this->attachment = $attachment;
        $this->size       = $size;
        $this->container  = $container;

        $this->imageSizes = $this->getMetadata()->get(['app', 'imageSizes']);
    }

    /**
     * @param Attachment $attachment
     * @param string     $size
     * @param Container  $container
     * @return mixed
     */
    public static function init(Attachment $attachment, string $size, Container $container)
    {
        $mime      = $attachment->get('type');
        $className = self::MAPPING[$mime] ?? "Dam\Core\Preview\File";

        return (new $className($attachment, $size, $container))->show();
    }

    /**
     * @param Attachment $attachment
     * @param            $size
     * @return string
     */
    protected function buildPath(Attachment $attachment, $size)
    {
        if ($attachment->get('relatedType') === "Asset") {
            $asset = $attachment->get('related');
            if ($asset) {
                $isPrivate = $asset->get('private');
            }
        }

        $path = isset($isPrivate) ? DAMUploadDir::DAM_THUMB_PATH : DAMUploadDir::BASE_THUMB_PATH;

        return $path . $attachment->get('storageFilePath') . "/{$size}/" . $attachment->get('name');
    }

    /**
     * @param $thumbFilePath
     * @param $filePath
     * @param $size
     * @return mixed
     * @throws Error
     * @throws \Gumlet\ImageResizeException
     */
    protected function createThumb($thumbFilePath, $filePath, $size)
    {
        $image = new ImageResize($filePath);

        if (!$this->imageSizes[$size]) {
            throw new Error();
        }

        list($w, $h) = $this->imageSizes[$size];

        $image->resizeToBestFit($w, $h);

        if ($this->getFileManager()->putContents($thumbFilePath, $image->getImageAsString())) {
            return $thumbFilePath;
        }

        return false;
    }

    /**
     * @return mixed
     */
    protected function getMetadata()
    {
        return $this->container->get('metadata');
    }

    /**
     * @return mixed
     */
    protected function getEntityManager()
    {
        return $this->container->get('entityManager');
    }

    /**
     * @return mixed
     */
    protected function getFileManager()
    {
        return $this->container->get('fileManager');
    }

    /**
     * @return mixed
     */
    abstract public function show();
}