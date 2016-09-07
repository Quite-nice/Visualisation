Package.describe({
	name: 'visualisation:generic-components',
	version: '0.0.7',
	// Brief, one-line summary of the package.
	summary: 'Generic module and event templates',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/Quite-nice/Visualisation',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4');
	api.use(['ecmascript', 'templating', 'less', 'reactive-var']);
	api.use(['visualisation:extension-system@0.0.3', 'visualisation:database@0.0.2', 'kadira:flow-router@2.12.1']);
	api.mainModule('generic-ui.js', 'client');
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('visualisation:generic-components');
	api.mainModule('generic-ui-tests.js');
});

Npm.depends({
	moment: "2.8.3"
});