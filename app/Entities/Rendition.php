<?php

namespace Dam\Entities;

use Dam\Core\FilePathBuilder;
use Dam\Core\FileStorage\DAMUploadDir;
use Dam\Core\PathInfo;
use \Espo\Core\Templates\Entities\Base;

class Rendition extends Base implements PathInfo
{
    public $isAutoCreated = false;
    protected $entityType = "Rendition";

    public function getPathInfo(): array
    {
        return [
            ($this->get('private') ? DAMUploadDir::PRIVATE_PATH : DAMUploadDir::PUBLIC_PATH) . "{$this->get('type')}/",
            $this->get('private') ? FilePathBuilder::PRIVATE : FilePathBuilder::PUBLIC
        ];
    }

    public function getMainFolder(): string
    {
        return  $this->get("type");
    }
}
