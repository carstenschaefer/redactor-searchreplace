# redactor-searchreplace
Searches and replaces text in editor. Can be started using a button in toolbar or by pressing CTRL+F.
Font Awesome is a requirement.

##Features:
Preserves any formatting while replacing.
Search and replace can operate on text selection in editor only. 
Can match on word boundaries only.
Can be case sensitive or not.

A plugin developed for [Redactor](http://imperavi.com/redactor/), a WYSIWYG rich-text editor made by [imperavi](http://imperavi.com/).

The example uses [Angular Redactor] (https://github.com/TylerGarlick/angular-redactor).

Feel free to contribute to this repository.

##Installation

Include searchreplace.js and fontawesome in your markup:

```html
<link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css" />
<script src="contexttoolbar.js"></script>
```

##Usage
Configuration via HTML markup:

```html
<div id="page-editor-toolbar"></div>
 <textarea ng-model="pageModel.content"
                redactor="{
							focus: true,
							linebreaks: false,
							tabKey: true,
							plugins: ['searchreplace'],
							toolbarExternal: '#page-editor-toolbar'
                          }"></textarea>
 ````
 

