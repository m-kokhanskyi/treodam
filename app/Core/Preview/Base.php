<?php


namespace Dam\Core\Preview;


use Dam\Entities\Attachment;
use Treo\Core\Container;

abstract class Base
{
    protected $attachment;
    protected $size;
    protected $container;

    const MAPPING = [
        "application/pdf" => Pdf::class,
        "image/gif" => Image::class,
        "image/jpeg" => Image::class,
        "image/png" => Image::class
    ];

    public function __construct(Attachment $attachment, string $size, Container $container)
    {
        $this->attachment = $attachment;
        $this->size = $size;
        $this->container = $container;
    }

    public static function init(Attachment $attachment, string $size, Container $container)
    {
        $mime = $attachment->get('type');
        $className = self::MAPPING[$mime] ?? "File";

        return (new $className($attachment, $size, $container))->show();
    }

    protected function getMetadata()
    {
        return $this->container->get('metadata');
    }

    protected function getEntityManager ()
    {
        return $this->container->get('entityManager');
    }

    protected function getFileManager ()
    {
        return $this->container->get('fileManager');
    }

    abstract public function show();
}