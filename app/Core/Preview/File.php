<?php


namespace Dam\Core\Preview;


class File extends Base
{

    public function show()
    {
        header('Content-Type: image/png');
        $img  = imagecreatetruecolor(1, 1);
        imagesavealpha($img, true);
        $color = imagecolorallocatealpha($img, 255, 255, 255, 0);
        imagefill($img, 0, 0, $color);
        imagepng($img);
        imagecolordeallocate($img, $color);
        imagedestroy($img);
        exit;
    }
}