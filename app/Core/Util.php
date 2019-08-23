<?php


namespace Dam\Core;


use FilesystemIterator;
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
}