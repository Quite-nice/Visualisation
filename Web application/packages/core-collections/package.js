Package.describe({
  name: 'core-collections',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'The module and event collections',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'mongo']);
  api.mainModule('core-collections.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('core-collections');
  api.mainModule('core-collections-tests.js');
});
