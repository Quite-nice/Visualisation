Package.describe({
	name: 'visualisation:zre',
	version: '0.0.5',
	// Brief, one-line summary of the package.
	summary: 'visualise ZRE network (requires meteor 1.6)',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/Quite-nice/Visualisation',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.6-beta.9');
	api.use('ecmascript');
	api.use('templating@1.3.2');
	api.use('visualisation:database@0.0.2');
	api.use('visualisation:extension-system@0.0.3');

	api.mainModule('zre.js', 'server');
	api.mainModule('UI/main.js', 'client')
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('visualisation:zre');
	api.mainModule('zre-tests.js');
});

Npm.depends({
	'zyre.js': '1.1.0'
});