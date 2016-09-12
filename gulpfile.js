var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var data = require('gulp-data');
var fs = require('fs');
var jsoncombine = require('gulp-jsoncombine');


/*
 * Combine all language json files.
 */
gulp.task('json', function() {
  return gulp.src('./src/**/*.json')
    .pipe(jsoncombine('result.json', function(data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest('./src/data'));
});


/**
 * Get data via JSON file, keyed on filename.
 */
gulp.task('templates.en', function() {
  var options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false,
    batch: ['./src/partials']
  };

  return gulp.src('./src/index.hbs')
    .pipe(data(function(file) {
      return JSON.parse(
        fs.readFileSync('./src/data/test.json')
      );
    }))
    .pipe(handlebars({}, options))
    .pipe(rename('test.html'))
    .pipe(gulp.dest('./dist'));
});



