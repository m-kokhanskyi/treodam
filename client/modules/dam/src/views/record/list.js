/*
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

Espo.define('dam:views/record/list', 'views/record/list',
    Dep => Dep.extend({

        setup() {
            Dep.prototype.setup.call(this);

            (this.getMetadata().get(['clientDefs', this.scope, 'disabledMassActions']) || []).forEach(item => this.removeMassAction(item));
        },
    
        actionQuickRemove: function (data) {
            data = data || {}
            var id = data.id;
            if (!id) return;
        
            var model = this.collection.get(id);
            if (!this.getAcl().checkModel(model, 'delete')) {
                this.notify('Access denied', 'error');
                return false;
            }
        
            this.confirm({
                message: this.translate('removeRecordConfirmation', 'messages'),
                confirmText: this.translate('Remove')
            }, function () {
                this.collection.trigger('model-removing', id);
                this.collection.remove(model);
                this.notify('Removing...');
                model.destroy({
                    wait: true,
                    success: function () {
                        this.notify('Removed', 'success');
                        this.trigger("after:model-remove");
                    }.bind(this),
                    error: function () {
                        this.notify('Error occured', 'error');
                        this.collection.push(model);
                    }.bind(this)
                });
            }, this);
        },
    })
);

