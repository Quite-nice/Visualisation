Package.describe({
	name: 'generic-ui',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'Generic module and event templates',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4');
	api.use(['ecmascript', 'templating']);
	api.use(['extension-system', 'database']);
	api.mainModule('generic-ui.js', 'client');
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('generic-ui');
	api.mainModule('generic-ui-tests.js');
});