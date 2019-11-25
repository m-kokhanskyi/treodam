<?php
declare(strict_types=1);
namespace Dam\Services;

use Espo\Core\Exceptions\Error;
use Treo\Core\FileStorage\Manager;

class RenditionVersion extends \Espo\Core\Templates\Services\Base
{
    /**
     * @param $attachment
     * @return bool
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
        $rendition = $attachment->get('related');

        if (!$rendition) {
            return false;
        }

        $filePath = $this->getFileStoreManager()->getLocalFilePath($attachment);

        $path     = pathinfo($filePath);
        $destPath = $this->buildDestPath($path['dirname'], $attachment) . "/" . $attachment->get("name");

        if ($this->getFileManager()->move($filePath, $destPath, false)) {
            return parent::createEntity((object)[
                'name'           => $this->createNameFromDate($attachment->get('createdAt')),
                'renditionId'    => $rendition->id,
                "fileName"       => $attachment->get('name'),
                "assignedUserId" => $rendition->get("assignedUserId"),
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
     * @param        $entity
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
