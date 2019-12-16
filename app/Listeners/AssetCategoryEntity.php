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

declare(strict_types=1);

namespace Dam\Listeners;

use Dam\Entities\Asset;
use Dam\Listeners\Traits\ValidateCode;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\ORM\Entity;
use Treo\Core\EventManager\Event;
use Treo\Listeners\AbstractListener;

/**
 * Class AssetCategoryEntity
 *
 * @package Dam\Listenersя вроде с сегод
 *
 */
class AssetCategoryEntity extends AbstractListener
{
    use ValidateCode;

    /**
     * @param Event $event
     *
     * @throws BadRequest
     */
    public function beforeSave(Event $event)
    {
        $entity = $event->getArgument('entity');

        if (!$this->isValidCode($entity)) {
            throw new BadRequest($this->getLanguage()->translate('Code is invalid', 'exceptions', 'Global'));
        }

        $parent = $entity->get('categoryParent');

        if ($parent && $this->hasAssets($parent)) {
            throw new BadRequest($this->getLanguage()->translate('Category have assets', 'exceptions', 'Global'));
        }

        if ($this->isChange($entity)) {
            $entity->set('categoryRoute', $this->getCategoryRoute($entity));
            $entity->set('categoryRouteName', $this->getCategoryRoute($entity, true));
        }
    }

    /**
     * Update child route
     *
     * @param Event $event
     */
    public function afterSave(Event $event)
    {
        $entity = $event->getArgument('entity');

        $this->updateChildren($entity)
             ->activateParents($entity)
             ->updateHasChild($entity)
             ->deactivateChildren($entity);
    }

    /**
     * @param Event $event
     *
     * @throws BadRequest
     */
    public function beforeRemove(Event $event)
    {
        $entity = $event->getArgument('entity');

        if ($this->hasChild($entity)) {
            throw new BadRequest($this->getLanguage()->translate("Category has child", 'exceptions', 'Global'));
        }
    }

    /**
     * @param Event $event
     */
    public function afterRemove(Event $event)
    {
        $entity = $event->getArgument('entity');

        if ($oldParent = $this->getOldParent($entity)) {
            $oldParent->set('hasChild', $this->hasChild($oldParent));
            $this->save($oldParent);
        }
    }

    /**
     * @param Event $event
     *
     * @throws BadRequest
     */
    public function beforeRelate(Event $event)
    {
        $entity = $event->getArgument('entity');

        if ($this->hasChild($entity) && $event->getArgument("relationName") === "asset") {
            throw new BadRequest($this->getLanguage()->translate("Category is not last", 'exceptions', 'Global'));
        }

        if ($entity->get("categoryParentId") && $event->getArgument("relationName") === "collections") {
            throw new BadRequest($this->getLanguage()->translate("Only root category"));
        }
    }

    /**
     * @param        $entity
     * @param string $relationName
     *
     * @return bool
     */
    protected function getForeignEntity($entity, string $relationName)
    {
        if (is_string($entity) && $relationName == 'assets') {
            $entity = $this->getEntityManager()->getRepository('Asset')->where(['id' => $entity])->findOne();
        }

        if (is_a($entity, Asset::class)) {
            return $entity;
        }

        return false;
    }

    /**
     * @param Entity $entity
     *
     * @return $this
     */
    protected function updateHasChild(Entity $entity)
    {
        if ($this->isChange($entity)) {
            if ($oldParent = $this->getOldParent($entity)) {
                $oldParent->set('hasChild', $this->hasChild($oldParent));
                $this->save($oldParent);
            }

            if ($newParent = $entity->get('categoryParent')) {
                $newParent->set('hasChild', true);
                $this->save($newParent);
            }
        }

        return $this;
    }

    /**
     * @param Entity $entity
     *
     * @return $this
     */
    protected function updateChildren(Entity $entity)
    {
        if ($this->isChange($entity) && !$entity->isNew()) {
            $children = $this->getEntityChildren($entity->get('categories'));
            foreach ($children as $child) {
                $child->set('categoryRoute', $this->getCategoryRoute($child));
                $child->set('categoryRouteName', $this->getCategoryRoute($child, true));
                $this->save($child);
            }
        }

        return $this;
    }

    /**
     * @param Entity $entity
     *
     * @return $this
     */
    protected function activateParents(Entity $entity)
    {
        $isActivate = $entity->isAttributeChanged('isActive') && $entity->get('isActive');

        if ($isActivate && !$entity->isNew()) {
            foreach ($this->getEntityParents($entity) as $parent) {
                $parent->set('isActive', true);
                $this->save($parent);
            }
        }

        return $this;
    }

    /**
     * @param Entity $entity
     *
     * @return $this
     */
    protected function deactivateChildren(Entity $entity)
    {
        $isDeactivate = $entity->isAttributeChanged('isActive') && !$entity->get('isActive');

        if ($isDeactivate && !$entity->isNew()) {
            $children = $this->getEntityChildren($entity->get('categories'));

            foreach ($children as $child) {
                $child->set('isActive', false);
                $this->save($child);
            }
        }

        return $this;
    }

    /**
     * @param Entity $entity
     * @param array  $options
     */
    protected function save(Entity $entity, array $options = [])
    {
        $options = $options ?: ['skipBeforeSave' => true, 'skipAfterSave' => true];
        $this->getEntityManager()->saveEntity($entity, $options);
    }

    /**
     * @param      $entity
     * @param bool $isName
     *
     * @return string
     */
    protected function getCategoryRoute($entity, $isName = false): string
    {
        $result = '';
        $data   = [];

        while (!empty($parent = $entity->get('categoryParent'))) {
            $data[] = $isName ? trim($parent->get('name')) : $parent->get('id');
            $entity = $parent;
        }

        if ($data) {
            $result = $isName ? implode(' > ', array_reverse($data)) : ('|' . implode('|', array_reverse($data)) . '|');
        }

        return $result;
    }

    /**
     * Get entity parents
     *
     * @param Entity $category
     * @param array  $parents
     *
     * @return array
     */
    protected function getEntityParents(Entity $category, array $parents = []): array
    {
        $parent = $category->get('categoryParent');

        if (!empty($parent)) {
            $parents[] = $parent;
            $parents   = $this->getEntityParents($parent, $parents);
        }

        return $parents;
    }

    /**
     * Get all children by recursive
     *
     * @param array $entities
     * @param array $children
     *
     * @return array
     */
    protected function getEntityChildren($entities, array $children = [])
    {
        if (!empty($entities)) {
            foreach ($entities as $entity) {
                $children[] = $entity;
            }
            foreach ($entities as $entity) {
                $children = $this->getEntityChildren($entity->get('categories'), $children);
            }
        }

        return $children;
    }

    /**
     * @param $entity
     *
     * @return bool
     */
    private function isChange(Entity $entity): bool
    {
        return ($entity->isAttributeChanged('categoryParentId') || $entity->isNew() || $entity->isAttributeChanged('name'));
    }

    /**
     * @param Entity $entity
     *
     * @return bool
     */
    private function hasChild(Entity $entity): bool
    {
        $repository = $this->getEntityManager()->getRepository($entity->getEntityType());

        return $repository->where([
            'categoryParentId' => $entity->id,
        ])->limit(0, 1)->find()->toArray() ? true : false;
    }

    /**
     * @param Entity $entity
     *
     * @return Entity
     */
    private function getOldParent(Entity $entity): ?Entity
    {
        $repository = $this->getEntityManager()->getRepository($entity->getEntityType());

        return $repository->where(["id" => $entity->getFetched('categoryParentId')])->findOne();
    }

    /**
     * @param Entity $entity
     *
     * @return bool
     */
    private function hasAssets(Entity $entity): bool
    {
        return $assets = $entity->get('assets')->toArray() ? true : false;
    }

}
