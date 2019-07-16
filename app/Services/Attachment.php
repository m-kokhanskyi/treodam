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

use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;

/**
 * Class Attachment
 *
 * @package Dam\Services
 */
class Attachment extends \Espo\Services\Attachment
{
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

        $path   = $this->getPath($attachment);
        $result = [];

        if ($imageInfo = getimagesize($path)) {
            $result = [
                "width"       => $imageInfo[0],
                "height"      => $imageInfo[1],
                "color_space" => is_null($imageInfo['channels'] ?? null) ? null : ($imageInfo['channels'] == 3 ? "RGB" : "CMYK"),
                "color_depth" => $imageInfo['bits'] ?? null,
                'orientation' => $this->getPosition($imageInfo[0], $imageInfo[1]),
                'mime'        => $imageInfo['mime'] ?? null,
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
            $arr      = explode(',', $attachment->file);
            $contents = '';
            if (count($arr) > 1) {
                $contents = $arr[1];
            }

            $contents       = base64_decode($contents);
            $attachment->contents = $contents;

            $relatedEntityType = null;
            $field             = null;
            $role              = 'Attachment';
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

            $size = mb_strlen($contents, '8bit');

            if ($role === 'Attachment') {
                if (!in_array($fieldType, $this->attachmentFieldTypeList)) {
                    throw new Error("Field type '{$fieldType}' is not allowed for attachment.");
                }

                $rules = $this->getMetadata()->get(['app', 'validation', $field]);

                $maxSize = $rules['size'] ?? false;

                if (!$maxSize) {
                    $maxSize = ($maxSize = $this->getMetadata()->get(['entityDefs', $relatedEntityType, 'fields', $field, 'maxFileSize'])) ? $maxSize : $this->getConfig()->get('attachmentUploadMaxSize');
                }
                if ($maxSize) {
                    if ($size > $maxSize * 1024 * 1024) {
                        throw new Error("File size should not exceed {$maxSize}Mb.");
                    }
                }

                if (isset($rules['extensions']) && is_array($rules['extensions'])) {
                    $extension = pathinfo($attachment->name)['extension'] ?? null;

                    if (!in_array($extension, $rules['extensions'])) {
                        throw new Error("Use only next extension ". implode(', ', $rules['extensions']));
                    }
                }

            } elseif ($role === 'Inline Attachment') {
                if (!in_array($fieldType, $this->inlineAttachmentFieldTypeList)) {
                    throw new Error("Field '{$field}' is not allowed to have inline attachment.");
                }
                $inlineAttachmentUploadMaxSize = $this->getConfig()->get('inlineAttachmentUploadMaxSize');
                if ($inlineAttachmentUploadMaxSize) {
                    if ($size > $inlineAttachmentUploadMaxSize * 1024 * 1024) {
                        throw new Error("File size should not exceed {$inlineAttachmentUploadMaxSize}Mb.");
                    }
                }
            } else {
                throw new BadRequest("Not supported attachment role.");
            }
        }

        $entity = parent::createEntity($attachment);

        if (!empty($attachment->file)) {
            $entity->clear('contents');
        }

        return $entity;
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
}
