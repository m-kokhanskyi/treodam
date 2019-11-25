<?php

declare(strict_types=1);

namespace Dam\Core;

use Treo\Core\Container;

class ConfigManager
{
    protected $container;
    protected $jsonConfig;
    protected $customValue;
    protected $config;

    const PATH_TO_DAM    = "data/dam";
    const PATH_TO_CONFIG = self::PATH_TO_DAM . "/config.php";

    public function __construct(Container $container)
    {
        $this->container   = $container;
    }

    public static function getType($type)
    {
        return strtolower(str_replace(" ", '-', $type));
    }

    /**
     * @param array $path
     * @param array $config
     * @return array|mixed|null|string
     */
    public function get(array $path, array $config = [])
    {
        if (!$config) {
            $config = $this->getConfig();
        }

        foreach ($path as $pathItem) {
            if (isset($config[$pathItem])) {
                $config = $config[$pathItem];
            } else {
                return null;
            }
        }

        return $config;
    }

    public function getByType(array $path)
    {
        $config = $this->getConfig();

        if (!isset($config['type']['custom'][$path[0]])) {
            return $config['default'];
        }

        return $this->get($path, $config['type']['custom']);
    }

    public function getConfig()
    {
        if (!$this->config) {
            $this->config = include_once self::PATH_TO_CONFIG;
        }

        return $this->config;
    }
}