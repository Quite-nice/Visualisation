// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by extension-system.js.
import { name as packageName } from "meteor/visualisation:extension-system";

// Write your tests here!
// Here is an example.
Tinytest.add('extension-system - example', function (test) {
  test.equal(packageName, "extension-system");
});
