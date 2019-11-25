<?php
declare(strict_types=1);
namespace Dam\Core\Utils;


use Dam\Entities\Asset;
use Espo\Core\Exceptions\BadRequest;
use Treo\Core\Container;

class EntityManager extends \Espo\Core\Utils\EntityManager
{
    protected $asset_relation = [];
    protected $relation       = [];

    const ASSET_RELATION_NAME = "asset_relations";
    const RELATION_NAME       = 'relations';

    protected static function getAssetRelationTemplate(string $entityName)
    {
        return [
            [
                "name"       => self::ASSET_RELATION_NAME,
                "label"      => "Asset Relations",
                "view"       => "dam:views/asset_relation/record/panels/bottom-panel",
                "entityName" => $entityName,
            ],
        ];
    }

    public function __construct(Container $container = null)
    {
        $this->relation = [
            [
                "name"  => self::RELATION_NAME,
                "label" => "Relations",
                "view"  => "dam:views/asset/record/panels/relations",
            ],
        ];

        parent::__construct(
            $container->get('metadata'),
            $container->get('language'),
            $container->get('fileManager'),
            $container->get('config'),
            $container
        );
    }

    /**
     * @param array $params
     * @return bool
     * @throws \Espo\Core\Exceptions\BadRequest
     * @throws \Espo\Core\Exceptions\Conflict
     * @throws \Espo\Core\Exceptions\Error
     */
    public function createLink(array $params)
    {
        $relationEntityName = $params['entity'] === "Asset" ? $params['entityForeign'] : $params['entity'];

        if (
            $this->isAsset($params['entityForeign'], $params['entity']) &&
            $this->hasLinkTo($relationEntityName, "Asset")
        ) {
            throw new BadRequest("You can't create link to 'Asset' entity");
        }

        $res = parent::createLink($params);

        if ($params['entity'] === "Asset" || $params['entityForeign'] === "Asset") {
            $this->createAssetRelations($params);
            $this->createRelation();
            $this->createMassUploadAsset($params);
        }

        return $res;
    }

    /**
     * @param array $params
     * @return bool
     * @throws \Espo\Core\Exceptions\Error
     */
    public function deleteLink(array $params)
    {
        $res = parent::deleteLink($params);

        if ($params['entity'] === "Asset" || $params['link'] === "assets") {
            $this->deleteAssetRelations($params);
            $this->deleteRelation();
        }

        return $res;
    }

    protected function createAssetRelations($params)
    {
        $relationEntityName = $params['entity'] === "Asset" ? $params['entityForeign'] : $params['entity'];
        $panels             = array_filter($this->getMetadata()->get([
            "clientDefs",
            $relationEntityName,
            "bottomPanels",
            "detail",
        ]),
            function ($item) {
                return ($item['name'] !== self::ASSET_RELATION_NAME);
            }
        );
        $this->getMetadata()->set("clientDefs", $relationEntityName, [
            "bottomPanels" => [
                "detail" => array_merge(
                    $this->getAssetRelationTemplate($relationEntityName),
                    $panels ?? []
                ),
            ],
        ]);

        return $this->getMetadata()->save();
    }

    protected function createRelation()
    {
        $panels = array_filter($this->getMetadata()->get(["clientDefs", "Asset", "bottomPanels", "detail"]),
            function ($item) {
                return ($item['name'] !== self::RELATION_NAME);
            }
        );

        $this->getMetadata()->set("clientDefs", "Asset", [
            "bottomPanels" => [
                "detail" => array_merge(
                    $this->relation,
                    $panels ?? []
                ),
            ],
        ]);

        return $this->getMetadata()->save();
    }

    protected function createMassUploadAsset(array $params)
    {
        $link   = $params['entityForeign'] === "Asset" ? $params['link'] : $params['linkForeign'];
        $entity = $params['entity'] === "Asset" ? $params['entityForeign'] : $params['entity'];

        $this->getMetadata()->set("clientDefs", $entity, [
            "relationshipPanels" => [
                $link => [
                    "view" => "dam:views/asset/record/panels/bottom-panel"
                ],
            ],
        ]);

        $this->getMetadata()->save();
    }

    protected function deleteAssetRelations($params)
    {
        $relationEntityName = $params['entity'];

        if ($params['entity'] === "Asset") {
            $relationLink       = $params['link'];
            $relationEntityName = $this->getMetadata()->get(["entityDefs", "Asset", "links", $relationLink, "entity"]);
        }

        if ($this->hasLinkTo($relationEntityName, "Asset")) {
            return true;
        }

        $panels = array_filter($this->getMetadata()->get(["clientDefs", $relationEntityName, "bottomPanels", "detail"]),
            function ($item) {
                return ($item['name'] !== self::ASSET_RELATION_NAME);
            }
        );

        $this->getMetadata()->set("clientDefs", $relationEntityName, [
            "bottomPanels" => [
                "detail" => $panels ?? [],
            ],
        ]);

        return $this->getMetadata()->save();
    }

    protected function deleteRelation()
    {
        $links = array_keys($this->getMetadata()->get(["entityDefs", "Asset", "links"]));
        $diff  = array_diff($links, Asset::staticRelations());

        if (!$diff) {
            $panels = array_filter($this->getMetadata()->get(["clientDefs", "Asset", "bottomPanels", "detail"]),
                function ($item) {
                    return ($item['name'] !== self::RELATION_NAME);
                }
            );

            $this->getMetadata()->set("clientDefs", "Asset", [
                "bottomPanels" => [
                    "detail" => $panels ?? [],
                ],
            ]);

            return $this->getMetadata()->save();
        }

        return true;
    }

    protected function hasLinkTo(?string $entityName, ?string $to)
    {
        $links = $this->getMetadata()->get(['entityDefs', $entityName, "links"]);

        foreach ($links as $link) {
            if ($link['entity'] === $to) {
                return true;
            }
        }

        return false;
    }

    protected function isAsset(string $entityName1, string $entityName2)
    {
        return $entityName1 === "Asset" || $entityName2 === "Asset";
    }

}