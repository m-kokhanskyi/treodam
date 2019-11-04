{{#if show}}
<div class="row">
    <div class="col-sm-12" style="text-align: center">
        <a data-action="showImagePreview" data-id="{{get model "fileId"}}" href="?entryPoint=preview&type=attachment&size=original&id={{get model "fileId"}}">
            <img src="?entryPoint=preview&type=attachment&size=original&id={{get model "fileId"}}" class="img-fluid image-preview" alt="Responsive image">
        </a>
    </div>
</div>
<style>
.image-preview {
    max-height: 100%;
    max-width: 100%;
    background-image: linear-gradient(45deg, #cccccc 25%, transparent 25%), linear-gradient(-45deg, #cccccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cccccc 75%), linear-gradient(-45deg, transparent 75%, #cccccc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
</style>
{{/if}}
