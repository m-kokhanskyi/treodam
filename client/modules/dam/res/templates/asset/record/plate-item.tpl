<div class="plate-item">
	<div class="field-type">{{translateOption model.attributes.type scope=model.name field='type'}}</div>
	<div class="field-private">
		<i class="fa {{#if model.attributes.private}}fa-lock{{else}}fa-lock-open{{/if}}"></i>
	</div>
	<div class="actions">{{{rowActions}}}</div>
	<div class="field-preview">
		<img src="?entryPoint=preview&size=small&id={{model.id}}&v={{version}}" alt="">
	</div>
	<div class="field-name">
		<a href="#{{model.name}}/view/{{model.id}}" class="link" data-id="{{model.id}}" title="{{model.attributes.name}}">{{model.attributes.name}}</a>
	</div>
</div>

<style>
	.plate-item {
		width: 100%;
		height: 200px;
		border: 1px solid #e8eced;
		position: relative;
	}
	.plate-item .field-type {
		display: inline-block;
		position: absolute;
		top: 10px;
		left: 10px;
		border: 1px solid #e8eced;
		border-radius: 10px;
		padding: 1px 5px;
	}
	.plate-item .field-private {
		color: #999999;
		display: inline-block;
		position: absolute;
		top: 10px;
		right: 27px;
	}
	.plate-item .field-name {
		display: block;
		width: 100%;
		position: absolute;
		bottom: 10px;
		left: 0;
		padding: 0 10px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.plate-item .field-preview {
		display: block;
		margin-top: 40px;
		height: 125px;
		line-height: 125px;
		text-align: center;
		vertical-align: middle;
	}
	.plate-item .field-preview img {
		max-height: 100%;
		max-width: 100%;
	}
	.plate-item .actions {
		color: #999999;
		display: inline-block;
		position: absolute;
		top: 6px;
		right: 0;
	}
</style>
