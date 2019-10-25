<div class="row">
    <div class="col-sm-12">
        <input name="downloadType" type="radio" value="Asset" checked="checked">
        <span class="control-label">Original File</span>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <input name="downloadType" type="radio" value="Rendition">
        <span class="control-label">Rendition</span>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <input name="downloadType" type="radio" value="Custom Download">
        <span class="control-label">Custom Download</span>
    </div>
    <div class="cell col-sm-4 form-group" data-name="width">
        <label class="control-label" data-name="width"><span
                    class="label-text">{{translate "Width" scope="Global"}}</span></label>
        <input type="number" class="main-element form-control" name="width" value="{{get downloadModel "width"}}"
               autocomplete="off">
    </div>
    <div class="cell col-sm-4 form-group" data-name="height">
        <label class="control-label" data-name="height"><span
                    class="label-text">{{translate "Height" scope="Global"}}</span></label>
        <input type="number" class="main-element form-control" name="height" value="{{get downloadModel "height"}}"
               autocomplete="off">
    </div>
    <div class="cell col-sm-4 form-group" data-name="quality">
        <label class="control-label" data-name="name"><span
                    class="label-text">{{translate "Quality" scope="Global"}}</span></label>
        <input type="number" class="main-element form-control" name="quality" value="{{get downloadModel "quality"}}"
               autocomplete="off">
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <a data-name="custom-download" class="btn btn-primary col-sm-12"
           target="_blank">{{translate 'Download' scope='Asset'}}</a>
    </div>
</div>
