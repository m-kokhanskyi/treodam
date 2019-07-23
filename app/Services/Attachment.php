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

use Dam\Core\ConfigManager;
use Dam\Core\FileManager;
use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Core\Validation\Validator;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;
use Treo\Core\FileStorage\Manager;

/**
 * Class Attachment
 *
 * @package Dam\Services
 */
class Attachment extends \Espo\Services\Attachment
{
    public function __construct()
    {
        $this->addDependency("Validator");
        $this->addDependency("DAMFileManager");
        $this->addDependency("fileStorageManager");
        $this->addDependency("ConfigManager");

        parent::__construct();
    }

    /**
     * @param $id
     *
     * @return array
     * @throws NotFound
     */
    public function getImageInfo($id): array
    {
        if (!$attachment = $this->getEntityManager()->getEntity('Attachment', $id)) {
            throw new NotFound();
        }

        $path = $this->getPath($attachment);
        $result = [];

        if ($imageInfo = getimagesize($path)) {
            $result = [
                "width" => $imageInfo[0],
                "height" => $imageInfo[1],
                "color_space" => is_null($imageInfo['channels'] ?? null) ? null : ($imageInfo['channels'] == 3 ? "RGB" : "CMYK"),
                "color_depth" => $imageInfo['bits'] ?? null,
                'orientation' => $this->getPosition($imageInfo[0], $imageInfo[1]),
                'mime' => $imageInfo['mime'] ?? null,
            ];
        }

        if ($pathInfo = pathinfo($path)) {
            $result['extension'] = $pathInfo['extension'];
            $result['base_name'] = $pathInfo['basename'];
        }

        $result['size'] = filesize($path);

        return $result;
    }

    /**
     * @param $attachment
     *
     * @return mixed
     * @throws \Espo\Core\Exceptions\BadRequest
     * @throws \Espo\Core\Exceptions\Error
     * @throws \Espo\Core\Exceptions\Forbidden
     */
    public function createEntity($attachment)
    {
        if (!empty($attachment->file)) {
            $arr = explode(',', $attachment->file);
            $contents = '';
            if (count($arr) > 1) {
                $contents = $arr[1];
            }

            $contents = base64_decode($contents);
            $attachment->contents = $contents;

            $relatedEntityType = null;
            $field = null;
            $role = 'Attachment';
            if (isset($attachment->parentType)) {
                $relatedEntityType = $attachment->parentType;
            } elseif (isset($attachment->relatedType)) {
                $relatedEntityType = $attachment->relatedType;
            }
            if (isset($attachment->field)) {
                $field = $attachment->field;
            }

            if (isset($attachment->role)) {
                $role = $attachment->role;
            }
            if (!$relatedEntityType || !$field) {
                throw new BadRequest("Params 'field' and 'parentType' not passed along with 'file'.");
            }

            $fieldType = $this->getMetadata()->get(['entityDefs', $relatedEntityType, 'fields', $field, 'type']);
            if (!$fieldType) {
                throw new Error("Field '{$field}' does not exist.");
            }

            if ($this->hasAcl($relatedEntityType)) {
                throw new Forbidden("No access to " . $relatedEntityType . ".");
            }

            if (in_array($field, $this->getAcl()->getScopeForbiddenFieldList($relatedEntityType, 'edit'))) {
                throw new Forbidden("No access to field '" . $field . "'.");
            }

            if ($role === 'Attachment') {
                if (!in_array($fieldType, $this->attachmentFieldTypeList)) {
                    throw new Error("Field type '{$fieldType}' is not allowed for attachment.");
                }

                $r = $this->getConfigManager()->get(['gallery-image', 'validations']);

                if (isset($attachment->modelAttributes)) {

                    $model = $attachment->model;
                    $private = $asset->private ? "private" : "public";

                    $validationList = $this->getMetadata()->get(['app', 'validation', 'rules', $asset->type]);
                    $globalList = $this->getMetadata()->get(['app', 'validation', 'rules', 'Global']);

                    $validationList = array_merge($globalList, $validationList);

                    foreach ($validationList as $type => $value) {
                        $this->getValidator()->validate($type, $attachment, ($value[$private] ?? $value));
                    }
                }
            }
        }

        $entity = parent::createEntity($attachment);

        if (!empty($attachment->file)) {
            $entity->clear('contents');
        }

        return $entity;
    }

    /**
     * @param \Dam\Entities\Asset $asset
     * @return mixed
     * @throws Error
     * @throws Forbidden
     */
    public function moveToAsset(\Dam\Entities\Asset $asset)
    {
        $attachmentId = $asset->get("type") === "Image" ? $asset->get("imageId") : $asset->get("fileId");
        $attachment = $this->getEntity($attachmentId);

        if ($attachment->get('sourceId')) {
            return $this->copyDuplicate($asset);
        }

        $sourcePath = DAMUploadDir::BASE_PATH . $attachment->get('storageFilePath');
        $destPath = ($asset->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $asset->get('path');

        if ($this->getFileManager()->moveFolder($sourcePath, $destPath)) {
            return $this->getEntityManager()->getRepository("Attachment")->updateStorage($attachment, $asset->get('path'));
        }

        return false;
    }

    public function copyDuplicate(\Dam\Entities\Asset $asset)
    {
        $attachmentId = $asset->get("type") === "Image" ? $asset->get("imageId") : $asset->get("fileId");
        $attachment = $this->getEntity($attachmentId);

        $sourcePath = $this->getFileStorageManager()->getLocalFilePath($attachment);
        $destPath = ($asset->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $asset->get('path');

        if ($this->getFileManager()->copy($sourcePath, $destPath, false, null, true)) {
            $attachment->set("storageFilePath", $asset->get('path'));
            $attachment->set('sourceId', null);
            return $this->getEntityManager()->getRepository("Attachment")->save($attachment);
        }

        return false;
    }

    /**
     * @param \Dam\Entities\Asset $asset
     * @return mixed
     * @throws Error
     * @throws Forbidden
     */
    public function changeAccess(\Dam\Entities\Asset $asset)
    {
        $source = ($asset->getFetched("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $asset->getFetched("path");
        $dest = ($asset->get("private") ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . $asset->get("path");

        $attachmentId = $asset->get("type") === "Image" ? $asset->get("imageId") : $asset->get("fileId");
        $attachment = $this->getEntity($attachmentId);

        if ($this->getFileManager()->moveFolder($source, $dest)) {
            return $this->getEntityManager()->getRepository("Attachment")->updateStorage($attachment, $asset->get('path'));
        }
    }

    /**
     * @return Validator
     */
    protected function getValidator(): Validator
    {
        return $this->getInjection("Validator");
    }

    /**
     * @param \Treo\Entities\Attachment $attachment
     *
     * @return mixed
     */
    private function getPath(\Treo\Entities\Attachment $attachment)
    {
        if ($attachment->get('sourceId')) {
            $attachment = $this->getRepository()->where(['id' => $attachment->get('sourceId')])->findOne();
        }

        return $this->getRepository()->getFilePath($attachment);
    }

    /**
     * @param $width
     * @param $height
     *
     * @return string
     */
    private function getPosition($width, $height): string
    {
        $result = "Square";

        if ($width > $height) {
            $result = "Landscape";
        } elseif ($width < $height) {
            $result = "Portrait";
        }

        return $result;
    }

    /**
     * @param $relatedEntityType
     *
     * @return bool
     */
    private function hasAcl($relatedEntityType): bool
    {
        return !$this->getAcl()->checkScope($relatedEntityType, 'create') && !$this->getAcl()->checkScope($relatedEntityType, 'edit');
    }

    protected function getFileManager(): FileManager
    {
        return $this->getInjection("DAMFileManager");
    }

    protected function getFileStorageManager(): Manager
    {
        return $this->getInjection("fileStorageManager");
    }

    protected function getConfigManager(): ConfigManager
    {
        return $this->getInjection("ConfigManager");
    }
}
