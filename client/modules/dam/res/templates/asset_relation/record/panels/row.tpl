<div class="col-sm-1 align-middle sort">
    {{{sort}}}
</div>
<div class="col-sm-2 preview">
    {{{preview}}}
</div>
<div class="col-sm-9">
    <div class="row">
        <div class="col-sm-12 main-list">
           {{{mainTable}}}
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


<style>
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
</style>