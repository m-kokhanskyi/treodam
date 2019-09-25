<table class="table full-table">
    <thead>
    <tr>
        {{#each header}}
        <th>
            {{#if this.hasCustomLabel}}
                {{this.customLabel}}
            {{else}}
                {{translate this.name scope=../../../model.name category='fields'}}
            {{/if}}
        </th>
        {{/each}}
    </tr>
    </thead>
    <tbody>
    <tr data-id="{{get model "id"}}" class="list-row">
        {{{row}}}
    </tr>
    </tbody>
</table>