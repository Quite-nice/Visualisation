Package.describe({
  name: 'visualisation:iphonegyro',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'visualize gyro data coming from the iphone',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Quite-nice/Visualisation/',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'templating', 'mongo', 'less']);
  api.use(['visualisation:database@0.0.1', 'visualisation:extension-system@0.0.1']);
  api.addAssets(['IPhone_6S_Rose_Gold.png'], 'client')
  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('visualisation:iphonegyro');
  api.mainModule('iphonegyro-tests.js');
});
