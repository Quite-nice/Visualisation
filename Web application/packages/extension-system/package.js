Package.describe({
	name: 'visualisation:extension-system',
	version: '0.0.4',
	// Brief, one-line summary of the package.
	summary: 'Provides a way to customize the UI',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/Quite-nice/Visualisation',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4');
	api.use('ecmascript');
	api.mainModule('registry.js', 'client');
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('visualisation:extension-system');
	api.mainModule('extension-system-tests.js');
});