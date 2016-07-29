'use strict';

const gulp  = require('gulp');
const react = require('gulp-react');

function jsx2js(filename) {
	return gulp.src(filename)
    .pipe(react({harmony: true, es6module: true}))
    .pipe(gulp.dest('./engcard/background/build/'));
}

gulp.task('init', () => {
	return jsx2js('./jsx/*.jsx');
});

gulp.task('jsx2js', ['init'], function() {
	return gulp.watch('./jsx/*.jsx', (event) => {
		jsx2js(event.path);
  });
});