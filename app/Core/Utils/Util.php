<?php


namespace Dam\Core\Utils;


use Imagick;
use ReflectionClass;
use Treo\Core\Utils\Random;

class Util extends \Treo\Core\Utils\Util
{
    public static function createName(string $mask, array $params = []): string
    {
        $result = preg_replace_callback("/{{([^}}]+)}}/", function ($item) use ($params) {
            $item = $item[1];

            switch (true) {
                case stripos($item, "date") !== false :
                    $i = explode(":", $item);
                    return date($i[1]);
                    break;
                case stripos($item, "rand") !== false :
                    $i = explode(":", $item);
                    return Random::getString($i[1] ?? 5);
                    break;

                case stripos($item, "unique") !== false:
                    return uniqid();
                    break;
                default :
                    return $params[$item];
            }
        }, $mask);

        return preg_replace("/[\/\\\:*?\"<>|+.\s%!@]/", "", $result);
    }

    /**
     * @param Imagick $imagick
     * @return |null
     * @throws \ReflectionException
     */
    public static function getColorSpace(Imagick $imagick)
    {
        $colorId = $imagick->getImageColorspace();

        if (!$colorId) {
            return null;
        }

        foreach ((new ReflectionClass($imagick))->getConstants() as $name => $value) {
            if (stripos($name, "COLORSPACE_") !== false && $value == $colorId) {
                $el = explode("_", $name);
                array_shift($el);
                return implode("_", $el);
            }
        }

        return null;
    }
}