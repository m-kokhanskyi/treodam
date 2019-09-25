<table class="table full-table">
    <thead>
    <tr>
        <th>Attribute Name</th>
        <th>Attribute Value</th>
        <th width="25px"></th>
    </tr>
    </thead>
    <tbody>
    {{#each rows}}
        <tr data-name="{{this}}">
            {{{var this ../this}}}
        </tr>
    {{/each}}
    </tbody>
</table>

<button data-name="add-attr-view" class="btn btn-default btn-sm action add-new-attr" type="button">Add new Attribute</button>

<style>
    .add-new-attr {
        margin-left: 8px;
    }
</style>