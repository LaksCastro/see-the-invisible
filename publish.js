const gh = require("gh-pages");

gh.publish("./dist", function (e) {
  if (e) {
    console.log(e);
    throw e;
  }

  console.log("Success Publish");
});
