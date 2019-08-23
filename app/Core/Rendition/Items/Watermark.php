<?php

declare(strict_types=1);

namespace Dam\Core\Rendition\Items;

use Imagick;

class Watermark extends Base
{
    /**
     * @return bool
     * @throws \ImagickException
     */
    public function create(): bool
    {
        // Open the image to draw a watermark
        $image = new Imagick();
        $image->readImage($this->file);

        $watermark = new Imagick();
        $watermark->readImage($this->params['watermark']);

        $watermarkResizeFactor = 6;

        $img_Width = $image->getImageWidth();
        $img_Height = $image->getImageHeight();
        $watermark_Width = $watermark->getImageWidth();
        $watermark_Height = $watermark->getImageHeight();

        $watermark->scaleImage((int)($watermark_Width / $watermarkResizeFactor),
            (int)($watermark_Height / $watermarkResizeFactor));

        $watermark_Width = $watermark->getImageWidth();
        $watermark_Height = $watermark->getImageHeight();

        switch ($this->params['position'] ?? "right-bottom") {
            case "right-bottom":
                $x = ($img_Width - $watermark_Width);
                $y = ($img_Height - $watermark_Height);
                break;
            case "right-top" :
                $x = ($img_Width - $watermark_Width);
                $y = 0;
                break;
            case "left-bottom":
                $x = 0;
                $y = ($img_Height - $watermark_Height);
                break;
            case "left-top";
                $x = 0;
                $y = 0;
                break;
        }

        $image->compositeImage($watermark, Imagick::COMPOSITE_OVER, $x, $y);

        $image->writeImage($this->file);

        return true;
    }
}