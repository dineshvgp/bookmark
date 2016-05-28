/**
 * Gulp tasks to bundle the modules
 */
"use strict";
let source = require("vinyl-source-stream");
let gulp = require("gulp");
let browserify = require("browserify");

//convert jsx to js and bundle it
//http://stackoverflow.com/questions/33801311/webpack-babel-6-es6-decorators
gulp.task("browserify", function() {
  browserify({
    entries: "./client/app.js",
    debug: true
  })
  .transform("babelify", {
    "presets": ["react", "es2015"],
    "plugins": ["transform-decorators-legacy", "transform-class-properties"]
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
