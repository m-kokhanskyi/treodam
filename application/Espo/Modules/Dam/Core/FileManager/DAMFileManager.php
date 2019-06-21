<?php


namespace Espo\Modules\Dam\Core\FileManager;


use Espo\Core\Container;
use Treo\Core\Utils\File\Manager;

/**
 * Class DAMFileManager
 *
 * @package Espo\Modules\Dam\Core\FileManager
 */
class DAMFileManager extends Manager
{
    protected $container = null;

    /**
     * DAMFileManager constructor.
     *
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        parent::__construct($this->container->get('config'));
    }

    /**
     * @param array|string $filePaths
     *
     * @return bool
     */
    public function unlink($filePaths)
    {
        if ($this->removeFile([$filePaths])) {
            return $this->removeEmptyDirs($filePaths);
        }

        return false;
    }
}
