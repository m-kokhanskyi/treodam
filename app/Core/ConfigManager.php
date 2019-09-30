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
            $res[$type]['renditions'] = $this->joinVariation($rules['renditions'] ?? []);
            $res[$type]['attributes'] = $this->joinAttributes($rules['attributes'] ?? []);
        }

        $res["default"] = array_merge($config['types']['global'] ?? [], $config['types']['default']);
        $res["default"]['validations'] = array_merge(($config['types']['global']['validations'] ?? []), ($config['types']['default']['validations'] ?? []));
        $res["default"]['renditions'] = $this->joinVariation($config['types']['default']['renditions'] ?? []);
        $res["default"]['renditions'] = $this->joinAttributes($config['types']['default']['attributes'] ?? []);

        return $res;
    }

    private function joinVariation($rules)
    {
        $res = [];
        $config = $this->container->get('metadata')->get(['app', 'config']);

        foreach ($rules as $variationCode => $rule) {
            $res[$variationCode] = array_merge($config['renditions'][$variationCode] ?? [], $rule);
            $res[$variationCode]['validations'] = array_merge($config['renditions'][$variationCode]['validations'] ?? [], $rule['validations'] ?? []);
            $res[$variationCode]['handlers'] = array_merge($config['renditions'][$variationCode]['handlers'] ?? [], $rule['handlers'] ?? []);
        }

        return $res;
    }

    private function joinAttributes($rules)
    {
        $attributes = $this->container->get('metadata')->get(['app', 'config', 'attributes']);

        return array_intersect_key($attributes, array_flip($rules));
    }
}