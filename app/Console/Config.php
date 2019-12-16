<?php
/**
 * Dam
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace Dam\Console;

use Treo\Console\AbstractConsole;

/**
 * Class Config
 * @package Dam\Console
 */
class Config extends AbstractConsole
{
    /**
     * Run action
     *
     * @param array $data
     */
    public function run(array $data): void
    {
        if (!file_exists("data/" . $data['module'] . "/config.yaml")) {
            self::show("Config not found in data/dam", self::ERROR, true);
        }

        $config = $this->container->get("FileManager")->varExport(yaml_parse_file("data/dam/config.yaml"));

        $res = file_put_contents(
            "data/dam/config.php",
            "<?php " . PHP_EOL . "return " . $config . ";" . PHP_EOL
        );

        if ($res === false) {
            self::show("Error on save config", self::ERROR, true);
        } else {
            $this->getConfig()->updateCacheTimestamp();
            $this->getConfig()->save();
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