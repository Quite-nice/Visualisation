Package.describe({
  name: 'visualisation:core-ui',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Basic page layout with a menu bar',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Quite-nice/Visualisation',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript', 'templating']);
  api.use(['devian:navigation@0.0.3', 'kadira:blaze-layout@2.3.0', 'kadira:flow-router@2.12.1', 'visualisation:extension-system@0.0.1', 'visualisation:database@0.0.1']);
  api.mainModule('core-ui.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('visualisation:core-ui');
  api.mainModule('core-ui-tests.js');
});
