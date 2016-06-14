Package.describe({
  name: 'visualisation:database',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Modules and events collections for the visualisation platform',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Quite-nice/Visualisation',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'mongo']);
  api.use(['reywood:publish-composite@1.4.2']);
  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('visualisation:database');
  api.mainModule('database-tests.js');
});
