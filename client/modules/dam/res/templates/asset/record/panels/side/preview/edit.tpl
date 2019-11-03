{{#if showImage}}
<div class="row">
    <div class="col-sm-12" style="text-align: center">
         <a data-action="showImagePreview" data-id="{{get model "fileId"}}" href="?entryPoint=preview&type=attachment&size=original&id={{get model "fileId"}}">
            <img src="?entryPoint=preview&type=attachment&size=original&id={{get model "fileId"}}" class="img-fluid" alt="Responsive image" style="max-width: 100%">
        </a>
    </div>
</div>
{{/if}}
