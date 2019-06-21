<?php

namespace Espo\Modules\Dam\Core\PathBuilder;


use Espo\Core\Container;
use Espo\Entities\Attachment;
use Espo\ORM\Metadata;

/**
 * Class DAMFilePathBuilder
 *
 * @package Espo\Modules\Dam\Core\PathBuilder
 */
class DAMFilePathBuilder implements PathBuilderInterface
{
    protected $container  = null;

    /**
     * DAMFilePathBuilder constructor.
     *
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @return string
     */
    public function createPath(): string
    {
        $md5 = md5(time());

        $depth         = $this->getMeta()->get('app.fileStorage.folderDepth') ?? 3;
        $elementLength = floor(32 / $depth);

        for ($i = 1; $i < $depth; $i++) {
            $part[] = substr($md5, ($i - 1) * $elementLength, $elementLength);
        }
        $part[] = substr($md5, ($elementLength * ($depth - 1)));


        return implode('/', $part);
    }

    /**
     * @return Metadata|null
     */
    private function getMeta()
    {
        return $this->container->get('metadata');
    }
}
