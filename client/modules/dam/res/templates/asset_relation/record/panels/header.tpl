<strong>{{name}}</strong>{{#if hasItems}}<button type="button" class="btn btn-default btn-sm show-view" title="{{translate "Show"}}"><span class="fas fa-chevron-{{#if show}}up{{else}}down{{/if}}"></span></button>{{/if}}
{{#if show}}
    <a class="btn btn-link collapsing-button" data-action="collapseAllPanels"><span class="fas fa-chevron-up"></span>Collapse All</a>
    <a class="btn btn-link collapsing-button" data-action="expandAllPanels"><span class="fas fa-chevron-down"></span>Expand All</a>
{{/if}}
