<table class="table full-table">
    {{#each items}}
    <tr data-name="{{this}}">
        {{{var this ../this}}}
    </tr>
    {{/each}}
</table>