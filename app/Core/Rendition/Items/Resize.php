<?php

declare(strict_types=1);

namespace Dam\Core\Rendition\Items;

use Gumlet\ImageResize;

class Resize extends Base
{
    /**
     * @return bool
     * @throws \Gumlet\ImageResizeException
     */
    public function create(): bool
    {
        $image = $this->getImageResize()->load($this->file);
        //$image = new ImageResize($this->file);
        $type = $this->params['type'] ?? "bestFit";

        switch ($type) {
            case "bestFit" :
                $image->resizeToBestFit($this->params['w'], $this->params['h'], $this->params['upscale']);
                break;
            case "resize" :
                $image->resize($this->params['w'], $this->params['h'], $this->params['upscale']);
                break;
            case "crop-center" :
                $image->crop($this->params['w'], $this->params['h'], $this->params['upscale'], ImageResize::CROPCENTER);
                break;
            case "crop-top" :
                $image->crop($this->params['w'], $this->params['h'], $this->params['upscale'], ImageResize::CROPTOP);
                break;
            case "crop-bottom" :
                $image->crop($this->params['w'], $this->params['h'], $this->params['upscale'], ImageResize::CROPBOTTOM);
                break;
            case "crop-left" :
                $image->crop($this->params['w'], $this->params['h'], $this->params['upscale'], ImageResize::CROPLEFT);
                break;
            case "crop-right" :
                $image->crop($this->params['w'], $this->params['h'], $this->params['upscale'], ImageResize::CROPRIGHT);
                break;
        }

        $image->save($this->file);

        return true;
    }

    protected function getImageResize() : \Dam\Core\ImageResize
    {
        return $this->container->get("ImageResize");
    }
}