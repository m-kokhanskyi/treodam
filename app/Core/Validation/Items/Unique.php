<?php


namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;
use Dam\Repositories\Attachment;
use Espo\Core\Exceptions\BadRequest;

class Unique extends Base
{
    public function validate(): bool
    {
        $md5 = md5($this->attachment->contents);

        /**@var $repository Attachment* */
        $count = $this->getRepository("Attachment")
            ->where([
                'hash_md5' => $md5,
                'deleted' => 0,
                'relatedId!=' => null,
            ])->count();

        return $count == 0;
    }

    /**
     * @throws BadRequest
     */
    public function onValidateFail()
    {
        throw new BadRequest("Duplicate file");
    }
}