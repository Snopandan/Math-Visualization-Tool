var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');
var copy = require('gulp-copy');

var inputFiles = {
  js: ['./js/**/*.js', '!./js/lib/**']
};

var outputFiles = {
  js: './js'
};

var jsOutputFileName = 'mvt.min.js';

gulp.task('build-js', ['clean'], function() {
  return gulp.src(inputFiles.js)
    .pipe(sourcemaps.init())
    .pipe(concat(jsOutputFileName))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputFiles.js));
});

gulp.task('clean', function(cb) {
  rimraf(outputFiles.js + '/' + jsOutputFileName, cb);
});

gulp.task('watch', function() {
  gulp.watch(inputFiles.js, ['build-js']);
});

var copyFiles =  ['index.html', './js**'];
var copyDestination = '/opt/lampp/htdocs';
gulp.task('copy-to-htdocs', function() {
  return gulp.src(copyFiles)
    .pipe(copy(copyDestination));
});

gulp.task('default', ['build-js', 'copy-to-htdocs',  'watch']);
