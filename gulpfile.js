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

//Copy bower js to assets
gulp.task("bower:js", function() {
  gulp.src(mainBowerFiles("**/*.js"))
    .pipe(concat("bower.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public/assets"));
});

//Copy bower css
gulp.task("bower:css", function() {
  gulp.src(mainBowerFiles("**/*.css"))
    .pipe(concat("bower.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("public/assets"));
});

//Copy custom css
gulp.task("css", function() {
  gulp.src(["assets/css/**/*"])
    .pipe(concat("style.css"))
    .pipe(gulp.dest("public/assets"));
});

//Copy fonts
gulp.task("copy:fonts", function() {
  gulp.src(["bower_components/Materialize/fonts/**/*"], {
    base: "bower_components/Materialize"
  })
  .pipe(gulp.dest("public/assets"));
});

gulp.task("default", [
  "browserify",
  "css",
  "bower:js",
  "bower:css",
  "copy:fonts"
]);
