<?php


namespace Dam\Core\Preview;


use Espo\Core\Exceptions\Error;
use Gumlet\ImageResize;
use Imagick;

class Pdf extends Image
{
    /**
     * @param $thumbFilePath
     * @param $filePath
     * @param $size
     * @return mixed
     * @throws Error
     * @throws \Gumlet\ImageResizeException
     * @throws \ImagickException
     */
    protected function createThumb($thumbFilePath, $filePath, $size)
    {
        if (!$this->imageSizes[$size]) {
            throw new Error();
        }

        $pathInfo = pathinfo($thumbFilePath);
        $thumbFilePath = $pathInfo['dirname'] . "/" . $pathInfo['filename'] . ".png";
        list($w, $h) = $this->imageSizes[$size];

        $image = ImageResize::createFromString($this->buildPreview($filePath));

        $image->crop($w, $h, true, ImageResize::CROPTOP);

        if ($this->getFileManager()->putContents($thumbFilePath, $image->getImageAsString())) {
            return $thumbFilePath;
        }

        return false;
    }

    /**
     * @param $filePath
     * @return string
     * @throws \ImagickException
     */
    protected function buildPreview($filePath)
    {
        $im = new Imagick($filePath . "[0]");
        $im->setimageformat("png");
        $im->setImageAlphaChannel(Imagick::ALPHACHANNEL_REMOVE);
        return $im->getImageBlob();
    }
}