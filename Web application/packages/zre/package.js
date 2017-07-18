Package.describe({
	name: 'visualisation:zre',
	version: '0.0.1',
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
	api.use('visualisation:database');

	api.mainModule('zre.js', 'server');
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