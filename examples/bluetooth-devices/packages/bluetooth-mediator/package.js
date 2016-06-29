Package.describe({
  name: 'visualisation:bluetooth-mediator',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Adds discovered bluetooth devices',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Quite-nice/Visualisation',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript', 'mongo']);
  api.use(['visualisation:database@0.0.1']);
  api.mainModule('bluetooth-mediator.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('visualisation:bluetooth-mediator');
  api.mainModule('bluetooth-mediator-tests.js');
});

Npm.depends({
  noble: "1.6.0"
});