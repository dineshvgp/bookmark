/**
 * Gulp tasks to bundle the modules
 */
"use strict";
let source = require("vinyl-source-stream");
let gulp = require("gulp");
let browserify = require("browserify");
var mainBowerFiles = require("main-bower-files");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");

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

//Copy bower js and custom js
gulp.task("copy:js", function() {
  gulp.src(["assets/js/**/*"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public/assets"));
});

//Copy bower css and custom css
gulp.task("copy:css", function() {
  gulp.src(["assets/css/**/*"])
    .pipe(concat("style.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("public/assets"));
});

//Copy fonts
gulp.task("copy:fonts", function() {
  gulp.src(["assets/fonts/**/*"], {
    base: "assets"
  })
  .pipe(gulp.dest("public/assets"));
});

gulp.task("default", [
  "browserify",
  "copy:js",
  "copy:css",
  "copy:fonts"
]);
