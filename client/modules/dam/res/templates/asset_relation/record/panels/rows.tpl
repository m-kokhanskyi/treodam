<div class="list sortable-row" style="display: none">
    {{#each rows}}
        <div class="row asset-relation-item" data-id="{{this}}">
            {{{var this ../this}}}
        </div>
    {{/each}}
</div>

<style>
    .list .row {
        margin-left: 0;
        margin-right: 0;
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
</style>