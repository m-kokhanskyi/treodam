<?php


namespace Espo\Modules\Dam\Core\PathBuilder;

/**
 * Interface PathBuilderInterface
 *
 * @package Espo\Modules\Dam\Core\PathBuilder
 */
interface PathBuilderInterface
{
    /**
     * @return string
     */
    public function createPath(): string;
}
