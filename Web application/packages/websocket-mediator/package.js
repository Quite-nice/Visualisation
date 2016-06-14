Package.describe({
	name: 'visualisation:websocket-mediator',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'Use meteor as a mediator to write messages and modules in the database',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4');
	api.use(['ecmascript', 'mongo', 'visualisation:database']);
	api.mainModule('main.js', 'server');
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('visualisation:websocket-mediator');
	api.mainModule('websocket-mediator-tests.js');
});

Npm.depends({
	bonjour: "3.5.0"
});