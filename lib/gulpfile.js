'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');

gulp.task('build', function () {
    var bundler = browserify('./index.js', { debug: true }).transform(babel);

    return bundler.bundle().on('error', function (err) {
        console.error(err);this.emit('end');
    }).pipe(source('ce.js')).pipe(buffer()).pipe(sourcemaps.init({ loadMaps: true })).pipe(sourcemaps.write('./')).pipe(gulp.dest('./build'));
});
gulp.task('default', ['build']);