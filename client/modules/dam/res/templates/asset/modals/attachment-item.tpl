<td class="preview">
    {{#if preview}}<img src="{{preview}}" class="image-preview">{{/if}}
</td>
<td>
    <div class="media-body">
        <h4 class="media-heading">{{name}}&nbsp;&nbsp;&nbsp;<span class="collapser fas fa-chevron-up" data-action="collapsePanel"></span> &nbsp;&nbsp;&nbsp;<span class="collapser fas fa-times" data-action="deleteAttachment"></span></h4>
        <p class="by-author">{{size}}</p>
        <div class="row">
            <div class="col-md-12 edit-form">
               {{{edit}}}
            </div>
        </div>
    </div>
</td>


<style>
    .attachment-list .preview {
        text-align: center;
    }
    .media-heading span {
        cursor: pointer;
    }
</style>

