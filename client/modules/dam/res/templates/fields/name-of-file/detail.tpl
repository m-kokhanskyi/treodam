{{#if isNotEmpty}}<a href="?entryPoint=download&id={{attachmentId}}" target="_blank">{{value}}</a>{{else}}
{{#if valueIsSet}}{{{translate 'None'}}}{{else}}...{{/if}}
{{/if}}