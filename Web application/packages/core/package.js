Package.describe({
  name: 'visualisation:core',
  version: '0.0.9',
  // Brief, one-line summary of the package.
  summary: 'Flexible visualisation system',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Quite-nice/Visualisation',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use('ecmascript');
  api.use(['visualisation:core-ui@0.0.8', 'visualisation:generic-components@0.0.7']);
  api.mainModule('core.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('visualisation:core');
  api.mainModule('core-tests.js');
});