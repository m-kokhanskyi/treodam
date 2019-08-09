<?php

declare(strict_types=1);
namespace Dam\Core\Validation\Items;


use Dam\Core\Validation\Base;
use Espo\Core\Exceptions\BadRequest;

class Quality extends Base
{

    public function validate(): bool
    {
        $img = new \Imagick($this->attachment->get('tmpPath'));
        $quality = $img->getImageCompressionQuality();

        if ($img->getImageMimeType() !== "image/jpeg") {
            return true;
        }

        return $quality >= $this->params['min'] && $quality <= $this->params['max'];
    }

    /**
     * @throws BadRequest
     */
    public function onValidateFail()
    {
        throw new BadRequest("Quality must between {$this->params['min']} and {$this->params['max']}");
    }
}