// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by zre.js.
import { name as packageName } from "meteor/visualisation:zre";

// Write your tests here!
// Here is an example.
Tinytest.add('zre - example', function (test) {
  test.equal(packageName, "zre");
});
