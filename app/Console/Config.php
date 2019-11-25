<?php


namespace Dam\Console;


use Treo\Console\AbstractConsole;

class Config extends AbstractConsole
{
    /**
     * Run action
     *
     * @param array $data
     */
    public function run(array $data): void
    {
        if (!file_exists("data/".$data['module']. "/config.yaml")) {
            self::show("Config not found in data/dam", self::ERROR, true);
        }

        $res = file_put_contents(
            "data/dam/config.php",
            "<?php " . PHP_EOL . "return " . $this->container->get("FileManager")->varExport(yaml_parse_file("data/dam/config.yaml")) . ";" . PHP_EOL
        );

        if ($res === false) {
            self::show("Error on save config", self::ERROR, true);
        } else {
            self::show("Config update successful", self::SUCCESS, true);
        }
    }

    /**
     * Get console command description
     *
     * @return string
     */
    public static function getDescription(): string
    {
        return "Method for build yaml configs to php arrays";
    }
}