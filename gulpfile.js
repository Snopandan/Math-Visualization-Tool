var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var jsonCombine = require('gulp-jsoncombine');

var inputFiles = {
  js: ['./js/**/*.js', '!./js/lib/**', '!./js/mvt.min.js']
};

var outputFiles = {
  js: './js'
};

var jsOutputFileName = 'build/mvt.min.js';

gulp.task('build-js', ['clean'], function() {
  return gulp.src(inputFiles.js)
    .pipe(sourcemaps.init())
    .pipe(concat(jsOutputFileName))
    .pipe(uglify().on('error', function(e) {
      console.log(e);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputFiles.js));
});

gulp.task('clean', function(cb) {
  rimraf(outputFiles.js + '/' + jsOutputFileName, cb);
});

gulp.task('watch', function() {
  gulp.watch(inputFiles.js, ['build-js']);
});

var copyFiles =  ['index.html', './js/**'];
var copyDestination = '/opt/lampp/htdocs/';
gulp.task('copy-to-htdocs', function() {
  return gulp.src(copyFiles)
    .pipe(copy(copyDestination));
});

var sassFiles = ['css/sass/**'];
var cssOutputDirectory = 'css/build/';
gulp.task('compileSass', function() {
  gulp.src(sassFiles)
        .pipe(sass())
        .pipe(gulp.dest('css/build'))
        .pipe(concat(cssOutputDirectory + 'style.css'))
        .pipe(gulp.dest('./'))
        .pipe(minifyCss())
        .pipe(rename(cssOutputDirectory+ 'style.min.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('combineJson', function() {
  gulp.src("js/json/visualizations/*.json")
  .pipe(jsonCombine("visualizations.json",function(data){
      return new Buffer(JSON.stringify(data));
   }))
   .pipe(gulp.dest("./js/build"));
});

gulp.task('default', ['build-js', 'compileSass', 'combineJson']);
