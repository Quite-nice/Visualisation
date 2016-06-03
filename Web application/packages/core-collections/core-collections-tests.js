// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by core-collections.js.
import { name as packageName } from "meteor/core-collections";

// Write your tests here!
// Here is an example.
Tinytest.add('core-collections - example', function (test) {
  test.equal(packageName, "core-collections");
});
