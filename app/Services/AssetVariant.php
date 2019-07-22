<?php

namespace Dam\Services;

use Dam\Core\FileManager;
use Dam\Core\FileStorage\DAMUploadDir;
use Espo\ORM\Entity;
use Treo\Core\Templates\Services\Base;

class AssetVariant extends Base
{
    public function __construct()
    {
        parent::__construct();

        $this->addDependency("DAMFileManager");
    }

    /**
     * @param Entity $entity
     * @return bool
     * @throws \Espo\Core\Exceptions\Error
     */
    public function moveToDam(Entity $entity)
    {
        if ($entity->get("imageId")) {
            $attachment = $entity->get('image');
        } else {
            $attachment = $entity->get('file');
        }

        $asset = $entity->get('asset');

        $sourcePath = DAMUploadDir::BASE_PATH . $attachment->get('storageFilePath');

        $filePath = $asset->get('path') . "/variant/{$entity->get('type')}";

        $destPath = ($asset->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $filePath;

        if ($this->getFileManager()->moveFolder($sourcePath, $destPath)) {
            return $this->getEntityManager()->getRepository("Attachment")->updateStorage($attachment, $filePath);
        }

        return false;

    }

    public function createVersion(Entity $entity)
    {
        $attachmentId = $entity->getFetched("imageId") ? $entity->getFetched("imageId") : $entity->getFetched("fileId");

        $attachment = $this->getEntityManager()->getEntity("Attachment", $attachmentId);

        return $this->getServiceFactory()->create("VariantVersion")->createEntity($attachment);
    }

    public function rebuildPath(Entity $entity)
    {
        $variants = $entity->get('assetVariants');
        $res = true;
        foreach ($variants as $variant) {
            $attachment = $variant->get("image") ? $variant->get("image") : $variant->get("file");

            $filePath = $entity->get('path') . "/variant/{$variant->get('type')}";

            $res &= $this->getEntityManager()->getRepository("Attachment")->updateStorage($attachment, $filePath);
        }

        return $res;
    }

    protected function getFileManager(): FileManager
    {
        return $this->getInjection('DAMFileManager');
    }
}
