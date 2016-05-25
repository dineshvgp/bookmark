var source = require("vinyl-source-stream");
var gulp = require("gulp");
var browserify = require("browserify");

//convert jsx to js and bundle it
gulp.task("browserify", function() {
  browserify({
    entries: "./client/app.js",
    debug: true
  })
  .transform("babelify", {
    "presets": ["react", "es2015"]
  })
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest("./public/assets"));
});

//watch for js files and reload it
gulp.task("browserify:watch", function() {
  gulp.watch("./client/**/*.js", ["browserify"]);
});

gulp.task("default", [
  "browserify",
  "browserify:watch"
]);
