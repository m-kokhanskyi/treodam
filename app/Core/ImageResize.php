<?php


namespace Dam\Core;

use Espo\Core\Exceptions\BadRequest;
use Treo\Core\Container;

class ImageResize
{
    protected $container;
    protected $image

    public $quality_jpg = 100;
    public $quality_png = 8;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function load(string $filename)
    {
        if (!defined('IMAGETYPE_WEBP')) {
            define('IMAGETYPE_WEBP', 18);
        }
        if (!$filename) {
            throw new BadRequest('File does not exist');
        }

        $this->image =
    }

    public function resizeToBestFit($max_width, $max_height, $allow_enlarge = false)
    {
        if ($this->getSourceWidth() <= $max_width && $this->getSourceHeight() <= $max_height && $allow_enlarge === false) {
            return $this;
        }

        $ratio  = $this->getSourceHeight() / $this->getSourceWidth();
        $width = $max_width;
        $height = $width * $ratio;

        if ($height > $max_height) {
            $height = $max_height;
            $width = $height / $ratio;
        }

        return $this->resize($width, $height, $allow_enlarge);
    }

    /**
     * Resizes image according to the given width and height
     *
     * @param integer $width
     * @param integer $height
     * @param boolean $allow_enlarge
     * @return ImageResize
     */
    public function resize($width, $height, $allow_enlarge = false)
    {
        if (!$allow_enlarge) {
            // if the user hasn't explicitly allowed enlarging,
            // but either of the dimensions are larger then the original,
            // then just use original dimensions - this logic may need rethinking

            if ($width > $this->getSourceWidth() || $height > $this->getSourceHeight()) {
                $width  = $this->getSourceWidth();
                $height = $this->getSourceHeight();
            }
        }

        $this->source_x = 0;
        $this->source_y = 0;

        $this->dest_w = $width;
        $this->dest_h = $height;

        $this->source_w = $this->getSourceWidth();
        $this->source_h = $this->getSourceHeight();

        return $this;
    }

    public function save(string $fileName)
    {
        
    }

}