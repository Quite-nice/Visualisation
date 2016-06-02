// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by publication.js.
import { name as packageName } from "meteor/githubMock";

// Write your tests here!
// Here is an example.
Tinytest.add('githubMock - example', function (test) {
  test.equal(packageName, "githubMock");
});
