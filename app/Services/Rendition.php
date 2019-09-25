<?php

namespace Dam\Services;

use Dam\Core\ConfigManager;
use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Core\Utils\Util;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Treo\Core\Utils\Language;

class Rendition extends \Espo\Core\Templates\Services\Base
{
    public function __construct()
    {
        parent::__construct();

        $this->addDependency("ConfigManager");
        $this->addDependency("filePathBuilder");
        $this->addDependency("language");
    }

    public function buildRenditions($entity)
    {
        $info = $this->getConfigManager()->get([ConfigManager::getType($entity->get("type"))]);

        if (!$info['renditions']) {
            return true;
        }

        $attachment = $info['nature'] === "image" ? $entity->get('image') : $entity->get('file');
        $pathToMainAttachment = $this->getEntityManager()->getRepository("Attachment")->getFilePath($attachment);

        foreach ($info['renditions'] as $renditionKey => $renditionParams) {

            if (!isset($renditionParams['auto']) || !$renditionParams['auto']) {
                continue;
            }

            $tmp = tempnam("", "");

            if (!file_put_contents($tmp, file_get_contents($pathToMainAttachment))) {
                throw new Error("Can't put content");
            }

            if (!$this->createFile($renditionParams, $tmp)) {
                //error on create
                continue;
            }

            $private = $entity->get('private');
            if (isset($renditionParams['access'])) {
                $private = $renditionParams['access'] === "private" ? true : false;
            }

            $pathInfo = pathinfo($pathToMainAttachment);

            $fileName = Util::createName(($renditionParams['fileNameMask'] ?? "{{rand}}"), [
                    "original" => $pathInfo['filename'],
                    "assetType" => $entity->get('type'),
                    "rendition" => $renditionKey
                ]) . ".{$pathInfo['extension']}";

            $path = $this->buildPath($private, $renditionKey);

            $newPath = ($private ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "{$renditionKey}/{$path}/" . $fileName;
            if ($this->getFileManager()->move($tmp, $newPath, false)) {
                $fileFieldName = $info['nature'] === "image" ? "imageId" : "fileId";
                $attachmentRepository = $this->getEntityManager()->getRepository("Attachment");

                $renditionEntity = $this->renditionEntity($entity->id, $renditionKey);
                $attachmentEntity = $attachmentRepository->get();

                if (!$renditionEntity->has("id")) {
                    $renditionEntity->set("id", Util::generateId());
                }
                $attachmentEntity->set("id", Util::generateId());

                $attachmentEntity->set([
                    "role" => "Attachment",
                    "storageFilePath" => $path,
                    "storage" => "DAMUploadDir",
                    "relatedId" => $renditionEntity->id,
                    "relatedType" => "Rendition",
                    "field" => $info['nature'],
                    "type" => mime_content_type($newPath),
                    "size" => filesize($newPath),
                    "name" => $fileName
                ]);

                $renditionEntity->set([
                    "name" => $this->getLanguage()->get(['Rendition', 'options', 'type', $renditionKey]),
                    "type" => $renditionKey,
                    "private" => $private,
                    $fileFieldName => $attachmentEntity->id,
                    "assetId" => $entity->id,
                    "nameOfFile" => $this->getFileName($attachmentEntity->get("name")),
                    "path" => $path,
                    "assignedUserId" => $entity->get("assignedUserId")
                ]);

                $renditionEntity->isAutoCreated = true;

                if (!$attachmentRepository->save($attachmentEntity)) {
                    throw new Error("Can't save 'Attachment'");
                }

                if (!$this->getEntityManager()->saveEntity($renditionEntity)) {
                    throw new Error("Can't save 'Rendition'");
                }
            }
        }
    }

    public function updateMetaData(\Dam\Entities\Rendition $entity)
    {
        $attachment = $entity->get('image') ?? $entity->get("file");

        if ($meta = $this->getServiceFactory()->create("Attachment")->getImageMeta($attachment)) {
            return $this->getServiceFactory()->create("AssetMetaData")->insertData("rendition", $entity->id, $meta);
        }

        return false;
    }

    public function validateType($entity)
    {
        $asset = $entity->get('asset');

        $info = $this->getConfigManager()->get([ConfigManager::getType($asset->get("type")), "renditions"]);

        if (!$info) {
            throw new Error("This asset can't have any renditions");
        }

        $renditionNames = array_keys($info);

        if (!in_array($entity->get('type'), $renditionNames)) {
            throw new Error("Unsupported type");
        }

        if ($this->getRepository()->checkExist($entity)) {
            throw new BadRequest("Rendition with type '{$entity->get("type")}' already exist");
        }

        return true;
    }

    public function createVersion($entity)
    {
        $asset = $entity->get('asset');
        $info = $this->getConfigManager()->get([
            ConfigManager::getType($asset->get('type')),
            "renditions",
            $entity->get("type")
        ]);

        if (!isset($info['createVersion']) || $info['createVersion'] === false) {
            return true;
        }

        $attachmentId = $entity->getFetched("imageId") ?? $entity->getFetched("fileId");
        $attachment = $this->getEntityManager()->getEntity("Attachment", $attachmentId);

        return $this->getServiceFactory()->create("RenditionVersion")->createEntity($attachment);
    }

    public function updateAttachmentInfo($entity)
    {
        $attachmentService = $this->getServiceFactory()->create("Attachment");
        $attachmentEntity = $entity->get("image") ?? $entity->get("file");

        $path = ($entity->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "{$entity->get("type")}/" . $entity->get("path") . "/" . $attachmentEntity->get("name");

        $imageInfo = $attachmentService->getImageInfo($attachmentEntity, $path);

        $entity->set([
            "width" => $imageInfo['width'],
            "height" => $imageInfo['height'],
            "colorSpace" => $imageInfo['color_space'],
            "colorDepth" => $imageInfo['color_depth'],
            "orientation" => $imageInfo['orientation'],
            "size" => round($imageInfo['size'] / 1024, 2),
            "sizeUnit" => "kb"
        ]);
    }

    public function createNameOfFile($entity)
    {
        $attachmentName = $entity->get("imageName") ?? $entity->get("fileName");
        $attachmentInfo = pathinfo($attachmentName);
        $entity->set("nameOfFile", $attachmentInfo['basename']);
    }

    protected function buildPath($private, $renditionType)
    {
        $type = $private ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC;

        return $this->getFilePathBuilder()->createPath($type, $renditionType);
    }

    protected function renditionEntity($assetId, $renditionType)
    {
        /**@var $renditionRepository \Espo\Custom\Repositories\Rendition* */
        $renditionRepository = $this->getRepository();
        $res = $renditionRepository->where([
            "assetId" => $assetId,
            "type" => $renditionType
        ])->findOne();

        return $res ? $res : $this->getEntity();
    }

    protected function createFile($renditionParams, $tmp)
    {
        $res = true;

        foreach ($renditionParams['handlers'] as $handlerName => $handlerParams) {
            if (!$res) {
                continue;
            }
            $res &= \Dam\Core\Rendition\Rendition::init($handlerName, $this->getEntityManager()->getContainer())
                ->setFile($tmp)
                ->setParams($handlerParams)
                ->create();
        }

        return $res;
    }

    protected function getFileName(string $name): ?string
    {
        $info = pathinfo($name);

        return $info['filename'] ?? null;
    }

    protected function getConfigManager(): ConfigManager
    {
        return $this->getInjection("ConfigManager");
    }


    protected function getLanguage(): Language
    {
        return $this->getInjection("language");
    }

    protected function getFilePathBuilder(): FilePathBuilder
    {
        return $this->getInjection("filePathBuilder");
    }
}

