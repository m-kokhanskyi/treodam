<?php

declare(strict_types=1);

namespace Dam\EntryPoints;


use Espo\Core\EntryPoints\Base;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;

class Preview extends Base
{
    public static $authRequired = true;

    /**
     * @throws BadRequest
     * @throws Forbidden
     * @throws NotFound
     */
    public function run()
    {
        if (empty($_GET['id'])) {
            throw new BadRequest();
        }
        $id   = $_GET['id'];
        $type = $_GET['type'] ?? "asset";

        $size = null;
        if (!empty($_GET['size'])) {
            $size = $_GET['size'];
        }

        $this->show($id, $type, $size);
    }

    public function show($id, $type, $size)
    {
        $attachment = $this->getAttachment($type, $id);

        if (!$attachment) {
            throw new NotFound();
        }

        if (!$this->getAcl()->checkEntity($attachment)) {
            throw new Forbidden();
        }

        return \Dam\Core\Preview\Base::init($attachment, $size, $this->getContainer())->show();
    }

    private function getAttachment($type, $id)
    {
        switch ($type) {
            case "attachment" :
                return $this->getEntityManager()->getEntity("Attachment", $id);
                break;
            case "asset":
            default:
                $asset = $this->getEntityManager()->getEntity("Asset", $id);
                return $asset->get("file");
        }

    }

}