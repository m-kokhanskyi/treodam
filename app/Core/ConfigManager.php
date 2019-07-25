<?php

declare(strict_types=1);
namespace Dam\Core;

use Treo\Core\Container;

class ConfigManager
{
    private $container;
    private $config;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->config = $this->join();
    }

    public static function getType($type)
    {
        return strtolower(str_replace(" ", '-', $type));
    }

    public function get(array $path)
    {
        $item = $this->config;

        if (!isset($item[$path[0]])) {
            return $item['default'];
        }

        foreach ($path as $pathItem) {
            if (isset($item[$pathItem])) {
                $item = $item[$pathItem];
            } else {
                return null;
            }
        }

        return $item;
    }

    private function join()
    {
        $res = [];
        $config = $this->container->get('metadata')->get(['app', 'config']);

        foreach ($config['types']['custom'] as $type => $rules) {
            $res[$type] = array_merge($config['types']['global'] ?? [], $rules);
            $res[$type]['validations'] = array_merge($config['types']['global']['validations'] ?? [], $rules['validations']);
            $res[$type]['variations'] = $this->joinVariation($rules['variations']);
        }

        $res["default"] = array_merge($config['types']['global'] ?? [], $config['types']['default']);
        $res["default"]['validations'] = array_merge($config['types']['global']['validations'] ?? [], $config['types']['default']['validations']);
        $res["default"]['variations'] = $this->joinVariation($config['types']['default']['variations']);

        return $res;
    }

    private function joinVariation($rules)
    {
        $res = [];
        $config = $this->container->get('metadata')->get(['app', 'config']);

        foreach ($rules as $variationCode => $rule) {
            $res[$variationCode] = array_merge($config['variations'][$variationCode] ?? [], $rule);
            $res[$variationCode]['validations'] = array_merge($config['variations'][$variationCode]['validations'] ?? [], $rule['validations']);
        }

        return $res;
    }
}