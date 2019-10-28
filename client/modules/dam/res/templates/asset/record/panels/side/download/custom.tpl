<div class="col-sm-12">
    <input name="downloadType" type="radio" value="custom">
    <span class="control-label">Custom Download</span>
</div>
<div class="additional-panel" style="display: none">
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
                    class="label-text">{{translate "Mode" scope="Global"}}</span></label>
        <select class="form-control main-element" name="scale">
            <option value="byWidth">{{translate "Scale by widht" scope="Global"}}</option>
            <option value="byHeight">{{translate "Scale by heigth" scope="Global"}}</option>
            <option value="resize">{{translate "Resize" scope="Global"}}</option>
        </select>
    </div>
</div>