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
     */
    public function run()
    {
        if (empty($_GET['id'])) {
            throw new BadRequest();
        }
        $id = $_GET['id'];

        $size = null;
        if (!empty($_GET['size'])) {
            $size = $_GET['size'];
        }

        $this->show($id, $size);
    }

    public function show($id, $size)
    {
        $asset      = $this->getEntityManager()->getEntity("Asset", $id);
        $attachment = $asset->get("file");

        if (!$attachment) {
            throw new NotFound();
        }

        if (!$this->getAcl()->checkEntity($attachment)) {
            throw new Forbidden();
        }

        return \Dam\Core\Preview\Base::init($attachment, $size, $this->getContainer())->show();
    }

}