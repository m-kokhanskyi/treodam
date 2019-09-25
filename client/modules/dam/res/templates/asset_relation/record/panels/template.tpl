{{#if items.length}}
<div class="group-container asset-relation-container">
    {{#each items}}
    <div class="group" data-name="{{this.name}}">
        <div class="group-name">
            <strong>{{this.name}}</strong>{{#if this.hasItem}}<button type="button" class="btn btn-default btn-sm show-view" title="{{translate "Show"}}"><span class="fas fa-chevron-up"></span></button>{{/if}}</span>
            <a class="btn btn-link collapsing-button" data-action="collapseAllPanels"><span class="fas fa-chevron-up"></span>Collapse All</a>
            <a class="btn btn-link collapsing-button" data-action="expandAllPanels"><span class="fas fa-chevron-down"></span>Expand All</a>
            <div class="pull-right btn-group">
                <button type="button" class="btn btn-default btn-sm action" title="Create"><span class="fas fa-plus"></span></button>
            </div>
        </div>
        <div class="list-container">
            <div class="list sortable-row">
                 <div class="row asset-relation-item">
                    <div class="col-sm-1 align-middle sort">
                        <span class="flaticon flaticon-move-arrows" data-id="5d7a2434cef907e33"></span>
                    </div>
                    <div class="col-sm-2 preview">
                        <div class="attachment-preview"><a data-action="showImagePreview" data-id="5d7a242c07dc01018" href="?entryPoint=image&size=small&id=5d7aac8d531d4d8cc"><img src="?entryPoint=image&size=small&id=5d7aac8d531d4d8cc" class="image-preview" style="width: 100%;"></a></div>
                    </div>
                    <div class="col-sm-9">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table full-table">
                                    <thead>
                                        <tr>
                                            <th><a href="javascript:" class="sort" data-name="name">Name</a></th>
                                            <th><a href="javascript:" class="sort" data-name="code">code</a></th>
                                            <th><a href="javascript:" class="sort" data-name="private">private</a></th>
                                            <th><a href="javascript:" class="sort" data-name="fileType">fileType</a></th>
                                            <th width="25"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr data-id="5d7a09789659da0ba" class="list-row">
                                            <td class="cell" data-name="name">
                                                <a href="#Asset/view/5d7a09789659da0ba" class="link" data-id="5d7a09789659da0ba" title="s-400x400">s-400x400</a>
                                            </td>
                                            <td class="cell" data-name="code">
                                                s400x400
                                            </td>
                                            <td class="cell" data-name="private">
                                                <input type="checkbox" disabled="">
                                            </td>
                                            <td class="cell" data-name="fileType"></td>
                                            <td class="cell" data-name="buttons">
                                                <div class="list-row-buttons btn-group pull-right">
                                                    <button type="button" class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown">
                                                        <span class="fas fa-ellipsis-v"></span>
                                                    </button>
                                                    <ul class="dropdown-menu pull-right">
                                                        <li><a href="#Asset/view/5d7a09789659da0ba" class="action" data-action="quickView" data-id="5d7a09789659da0ba">View</a></li>
                                                        <li><a href="#Asset/edit/5d7a09789659da0ba" class="action" data-action="quickEdit" data-id="5d7a09789659da0ba">Edit</a></li>
                                                        <li><a href="javascript:" class="action" data-action="unlinkRelated" data-id="5d7a09789659da0ba">Unlink</a></li>
                                                        <li><a href="javascript:" class="action" data-action="removeRelated" data-id="5d7a09789659da0ba">Remove</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="scope-list">
                                    <div class="group" data-name="{{this.name}}">
                                        <div class="group-name">
                                            <button type="button" class="btn btn-default btn-sm show-view" title="{{translate "Show"}}"><span class="fas fa-chevron-up"></span></button><strong>Scoupe</strong>
                                            <div class="pull-right btn-group">
                                                <button type="button" class="btn btn-default btn-sm action" title="Create"><span class="fas fa-plus"></span></button>
                                            </div>
                                        </div>
                                        <div class="list-container">
                                            <table class="table full-table">
                                                <thead>
                                                    <tr>
                                                        <th>Scope</th>
                                                        <th>Rendition</th>
                                                        <th>Channel</th>
                                                        <th colspan="2">Scoping</th>
                                                    </tr>
                                                </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Channel</td>
                                                    <td>All</td>
                                                    <td>Channel 1</td>
                                                    <td class="attr">sdaf;kjasdklfja;lksdjf;lkajsd;lfk</td>
                                                    <td class="cell last" data-name="buttons" width="25px">
                                                        <div class="list-row-buttons btn-group pull-right">
                                                            <button type="button" class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown">
                                                                <span class="fas fa-ellipsis-v"></span>
                                                            </button>
                                                            <ul class="dropdown-menu pull-right">
                                                                <li><a href="#Asset/view/5d7a09789659da0ba" class="action" data-action="quickView" data-id="5d7a09789659da0ba">View</a></li>
                                                                <li><a href="#Asset/edit/5d7a09789659da0ba" class="action" data-action="quickEdit" data-id="5d7a09789659da0ba">Edit</a></li>
                                                                <li><a href="javascript:" class="action" data-action="unlinkRelated" data-id="5d7a09789659da0ba">Unlink</a></li>
                                                                <li><a href="javascript:" class="action" data-action="removeRelated" data-id="5d7a09789659da0ba">Remove</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="row asset-relation-item">
                    <div class="col-sm-1 align-middle sort">
                        <span class="flaticon flaticon-move-arrows" style="font-size: 12px;" data-id="5d7a2434cef907e33"></span>
                    </div>
                    <div class="col-sm-2 preview">
                        <div class="attachment-preview"><a data-action="showImagePreview" data-id="5d7a242c07dc01018" href="?entryPoint=image&size=small&id=5d7aac8d531d4d8cc"><img src="?entryPoint=image&size=small&id=5d7aac8d531d4d8cc" class="image-preview" style="width: 100%;"></a></div>
                    </div>
                    <div class="col-sm-9">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table full-table">
                                    <thead>
                                        <tr>
                                            <th><a href="javascript:" class="sort" data-name="name">Name</a></th>
                                            <th><a href="javascript:" class="sort" data-name="code">code</a></th>
                                            <th><a href="javascript:" class="sort" data-name="private">private</a></th>
                                            <th><a href="javascript:" class="sort" data-name="fileType">fileType</a></th>
                                            <th width="25"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr data-id="5d7a09789659da0ba" class="list-row">
                                            <td class="cell" data-name="name">
                                                <a href="#Asset/view/5d7a09789659da0ba" class="link" data-id="5d7a09789659da0ba" title="s-400x400">s-400x400</a>
                                            </td>
                                            <td class="cell" data-name="code">
                                                s400x400
                                            </td>
                                            <td class="cell" data-name="private">
                                                <input type="checkbox" disabled="">
                                            </td>
                                            <td class="cell" data-name="fileType"></td>
                                            <td class="cell" data-name="buttons">
                                                <div class="list-row-buttons btn-group pull-right">
                                                    <button type="button" class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown">
                                                        <span class="fas fa-ellipsis-v"></span>
                                                    </button>
                                                    <ul class="dropdown-menu pull-right">
                                                        <li><a href="#Asset/view/5d7a09789659da0ba" class="action" data-action="quickView" data-id="5d7a09789659da0ba">View</a></li>
                                                        <li><a href="#Asset/edit/5d7a09789659da0ba" class="action" data-action="quickEdit" data-id="5d7a09789659da0ba">Edit</a></li>
                                                        <li><a href="javascript:" class="action" data-action="unlinkRelated" data-id="5d7a09789659da0ba">Unlink</a></li>
                                                        <li><a href="javascript:" class="action" data-action="removeRelated" data-id="5d7a09789659da0ba">Remove</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="scope-list">
                                    <div class="group" data-name="{{this.name}}">
                                        <div class="group-name">
                                            <strong>Scope</strong><button type="button" class="btn btn-default btn-sm show-view" title="{{translate "Show"}}"><span class="fas fa-chevron-up"></span></button>
                                            <div class="pull-right btn-group">
                                                <button type="button" class="btn btn-default btn-sm action" title="Create"><span class="fas fa-plus"></span></button>
                                            </div>
                                        </div>
                                        <div class="list-container">
                                            <table class="table full-table">
                                                <thead>
                                                    <tr>
                                                        <th>Scope</th>
                                                        <th>Rendition</th>
                                                        <th>Channel</th>
                                                        <th colspan="2">Scoping</th>
                                                    </tr>
                                                </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Channel</td>
                                                    <td>All</td>
                                                    <td>Channel 1</td>
                                                    <td class="attr">sdaf;kjasdklfja;lksdjf;lkajsd;lfk</td>
                                                    <td class="cell last" data-name="buttons" width="25px">
                                                        <div class="list-row-buttons btn-group pull-right">
                                                            <button type="button" class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown">
                                                                <span class="fas fa-ellipsis-v"></span>
                                                            </button>
                                                            <ul class="dropdown-menu pull-right">
                                                                <li><a href="#Asset/view/5d7a09789659da0ba" class="action" data-action="quickView" data-id="5d7a09789659da0ba">View</a></li>
                                                                <li><a href="#Asset/edit/5d7a09789659da0ba" class="action" data-action="quickEdit" data-id="5d7a09789659da0ba">Edit</a></li>
                                                                <li><a href="javascript:" class="action" data-action="unlinkRelated" data-id="5d7a09789659da0ba">Unlink</a></li>
                                                                <li><a href="javascript:" class="action" data-action="removeRelated" data-id="5d7a09789659da0ba">Remove</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Channel</td>
                                                    <td>All</td>
                                                    <td>Channel 1</td>
                                                    <td class="attr">sdaf;kjasdklfja;lksdjf;lkajsd;lfk</td>
                                                    <td class="cell last" data-name="buttons" width="25px">
                                                        <div class="list-row-buttons btn-group pull-right">
                                                            <button type="button" class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown">
                                                                <span class="fas fa-ellipsis-v"></span>
                                                            </button>
                                                            <ul class="dropdown-menu pull-right">
                                                                <li><a href="#Asset/view/5d7a09789659da0ba" class="action" data-action="quickView" data-id="5d7a09789659da0ba">View</a></li>
                                                                <li><a href="#Asset/edit/5d7a09789659da0ba" class="action" data-action="quickEdit" data-id="5d7a09789659da0ba">Edit</a></li>
                                                                <li><a href="javascript:" class="action" data-action="unlinkRelated" data-id="5d7a09789659da0ba">Unlink</a></li>
                                                                <li><a href="javascript:" class="action" data-action="removeRelated" data-id="5d7a09789659da0ba">Remove</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{/each}}
</div>
{{else}}
<div class="list-container">{{translate 'No Data'}}</div>
{{/if}}

<style>
   .group-name >.fa-plus, .group-name > .fa-minus, .group-name > .fa-chevron-up, .group-name > fa-chevron-down {
        font-size: 12px;
   }
   .list .row {
        margin-left: 0;
        margin-right: 0;
   }
   .scope-list button {
        border: none;
   }
   .scope-list button:active, .scope-list button:hover, .scope-list button:focus {
        background-color: #fff;
   }
   .scope-list .group-name {
        border-bottom: 1px solid #e8eced;
   }
   .scope-list td, .scope-list th {
        border: 1px solid #e8eced;
   }
   .portlet-placeholder {
        border: 1px dotted black;
        margin: 0 1em 1em 0;
  }
  .bottom .panel .group-container > .group:not(:last-child) {
        margin-bottom: 0;
  }
  .bottom .panel .group-container > .group > .group-name {
        border-bottom: none;
  }
  .attr {
    border-right: none !important;
  }
  .last {
    border-left: none !important;
  }
  .asset-relation-item {
    border-bottom: 1px solid #e8eced;
    padding-bottom: 15px;
    padding-top: 5px;
  }
  .asset-relation-item:last-child {
    border-bottom: none;
  }

  .asset-relation-item {
        position: relative;
  }
  .sort {
        height: 174px;
        padding-top: 85px;
        text-align: center;
  }
  .attachment-preview {
    margin-top: 30px;
  }
  .group-name {
    padding-left: 8px;
  }
</style>

<script>
$(function() {
    $('.sortable-row').sortable({
        connectWith: ".sortable-row",
        placeholder: "portlet-placeholder ui-corner-all",
        handle: ".flaticon-move-arrows",
        start : (event, ui) => {
           let h =  ui.item.outerHeight();
           $(".portlet-placeholder").css("height", h);

        }
    });
});
</script>