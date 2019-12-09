<?php
declare(strict_types=1);

namespace Dam\Services;

use Dam\Core\ConfigManager;
use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
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

        $info = $this->getConfigManager()->getByType([ConfigManager::getType($asset->get("type")), "renditions"]);

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

    public function updateAttachmentInfo($entity, $assetEntity)
    {
        $attachmentService = $this->getServiceFactory()->create("Attachment");
        $attachmentEntity  = $entity->get("file");
        $nature            = $this->getConfigManager()->getByType([
            ConfigManager::getType($assetEntity->get("type")),
            "renditions",
            $entity->get("type"),
            "nature"
        ]);

        $path = ($entity->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "{$entity->get("type")}/" . $entity->get("path") . "/" . $attachmentEntity->get("name");

        $fileInfo = $attachmentService->getFileInfo($attachmentEntity, $path);

        if ($fileInfo) {
            $entity->set([
                "size"     => round($fileInfo['size'] / 1024, 2),
                "sizeUnit" => "kb",
            ]);
        }

        if ($nature === "image") {
            $imageInfo = $attachmentService->getImageInfo($attachmentEntity, $path);
            if ($imageInfo) {
                $entity->set([
                    $this->attributeMapping("width")       => $imageInfo['width'],
                    $this->attributeMapping("height")      => $imageInfo['height'],
                    $this->attributeMapping("color-space") => $imageInfo['color_space'],
                    $this->attributeMapping("color-depth") => $imageInfo['color_depth'],
                    $this->attributeMapping("orientation") => $imageInfo['orientation'],
                ]);
            }

        }
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

    /**
     * @param $name
     * @return mixed
     */
    protected function getService($name)
    {
        return $this->getServiceFactory()->create($name);
    }

    protected function attributeMapping(string $name): string
    {
        return $this->getConfigManager()->get(["attributeMapping", $name, "field"]) ?? $name;
    }
}

