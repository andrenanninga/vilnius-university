'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var gutil = require('gulp-util');

gulp.task('clean', function() {
  gulp.src('./dist/**/*.*', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('bundle', function() {
  gulp.src('./lib/index.html')
    .pipe(gulp.dest('dist'));

  gulp.src('./bower_components/dat-gui/build/dat.gui.min.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function() {
  gulp.src('./lib/index.js', { read: false })
    .pipe(browserify().on('error', gutil.log))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/**/*.*', ['build']);
});

gulp.task('webserver', function() {
  connect.server({
    root: ['./dist']
  });
});

gulp.task('build', ['clean', 'bundle', 'browserify']);

gulp.task('default', ['build', 'watch', 'webserver']);