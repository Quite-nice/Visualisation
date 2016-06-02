Package.describe({
	name: 'githubMock',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: '',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4');
	api.use('ecmascript');
	api.use('mongo');

	api.mainModule('publication.js', 'server');
	api.mainModule('subscription.js', 'client');
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('githubMock');
	api.mainModule('githubMock-tests.js');
});