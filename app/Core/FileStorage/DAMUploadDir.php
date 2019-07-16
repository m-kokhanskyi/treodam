<?php

namespace Dam\Core\FileStorage;

use Dam\Core\FilePathBuilder;
use Dam\Entities\Asset;
use Treo\Core\FileStorage\Storages\UploadDir;
use Treo\Entities\Attachment;

/**
 * Class DAMUploadDir
 * @package Dam\Core\FileStorage
 */
class DAMUploadDir extends UploadDir
{
    const PRIVATE_PATH = 'data/dam/private/files/';
    const PUBLIC_PATH = 'data/dam/public/files/';

    const PRIVATE_THUMB_PATH = "data/dam/private/thumbs/";
    const PUBLIC_THUMB_PATH = "data/dam/public/thumbs/";

    /**
     * @return array
     */
    public static function thumbsFolderList()
    {
        return [
            self::PUBLIC_THUMB_PATH,
            self::PRIVATE_THUMB_PATH,
            self::BASE_THUMB_PATH
        ];
    }

    /**
     * @param Attachment $attachment
     *
     * @return string
     */
    protected function getFilePath(Attachment $attachment): string
    {
        $storage = $attachment->get('storageFilePath');
        $related = $attachment->get('related');

        if (is_a($related, Asset::class)) {
            $path = $related->get('private') ? self::PRIVATE_PATH : self::PUBLIC_PATH;
            $type = $related->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC;
        } else {
            $type = FilePathBuilder::UPLOAD;
            $path = self::BASE_PATH;
        }

        if (!$storage) {
            $storage = $this->getPathBuilder()->createPath($type);
            $attachment->set('storageFilePath', $storage);
        }

        return $path . "{$storage}/" . $attachment->get('name');
    }
}