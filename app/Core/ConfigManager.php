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
        $this->customValue = $this->loadCustomValues();
    }

    public static function getType($type)
    {
        return strtolower(str_replace(" ", '-', $type));
    }

    public function convert()
    {
        $config = $this->getConfigFromJson();

        foreach ($config['types']['custom'] as $type => $rules) {
            $res["type"]["custom"][$type]                = array_merge($config['types']['global'] ?? [], $rules);
            $res["type"]["custom"][$type]['validations'] = array_merge($config['types']['global']['validations'] ?? [], $rules['validations']);
            $res["type"]["custom"][$type]['renditions']  = $this->joinVariation($rules['renditions'] ?? []);
        }

        $res["type"]["default"]                = array_merge($config['types']['global'] ?? [], $config['types']['default']);
        $res["type"]["default"]['validations'] = array_merge(($config['types']['global']['validations'] ?? []), ($config['types']['default']['validations'] ?? []));
        $res["type"]["default"]['renditions']  = $this->joinVariation($config['types']['default']['renditions'] ?? []);

        $res["attributeMapping"] = $config["attributesMapping"];

        $this->jsonConfig = $this->replace($res);

        return $this;
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

    public function run()
    {
        return file_put_contents(
            self::PATH_TO_CONFIG,
            "<?php " . PHP_EOL . "return " . $this->container->get("FileManager")->varExport($this->jsonConfig) . ";" . PHP_EOL
        );
    }

    protected function replace(array $array, string $path = '')
    {
        foreach ($array as $key => &$value) {
            if ($value && is_array($value) && !isset($value[0])) {
                $array[$key] = $this->replace($value, ($path ? "{$path}.{$key}" : "{$key}"));
            } else {
                $localPath = "{$path}.{$key}";
                if (in_array($localPath, array_keys($this->customValue))) {
                    $value = $this->customValue[$localPath];
                }
            }
        }

        return $array;
    }

    public function getConfig()
    {
        if (!$this->config) {
            $this->config = include_once self::PATH_TO_CONFIG;
        }

        return $this->config;
    }

    protected function getConfigFromJson()
    {
        return $this->container->get("Metadata")->get("app.config");
    }

    protected function loadCustomValues()
    {
        return json_decode(@file_get_contents(self::PATH_TO_DAM . "/customValues.json") ?: "{}", true);
    }

    private function joinVariation($rules)
    {
        $res    = [];
        $config = $this->getConfigFromJson();

        foreach ($rules as $variationCode => $rule) {
            $res[$variationCode]                = array_merge($config['renditions'][$variationCode] ?? [], $rule);
            $res[$variationCode]['validations'] = array_merge($config['renditions'][$variationCode]['validations'] ?? [], $rule['validations'] ?? []);
            $res[$variationCode]['handlers']    = array_merge($config['renditions'][$variationCode]['handlers'] ?? [], $rule['handlers'] ?? []);
        }

        return $res;
    }
}