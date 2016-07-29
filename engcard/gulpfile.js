'use strict';

const gulp  = require('gulp');
const react = require('gulp-react');
const less = require('gulp-less');

function jsx2js(filename) {
	return gulp.src(filename)
    .pipe(react({harmony: true, es6module: true}))
    .pipe(gulp.dest('./src/background/build/'));
}

function insertLess2css() {
	return gulp.src('./less/insert.less')
		.pipe(less())
		.pipe(gulp.dest('./src/'));
}

function backgroundLess2css() {
	return gulp.src('./less/background.index.less')
		.pipe(less())
		.pipe(gulp.dest('./src/background/res/'));
}

// 初始化
gulp.task('initJsx', () => {
	return jsx2js('./jsx/*.jsx');
});

gulp.task('initInsertLess', () => {
	return insertLess2css();
});

gulp.task('initBackgroundLess', () => {
	return backgroundLess2css();
});

// 监听

gulp.task('default', ['initJsx', 'initInsertLess', 'initBackgroundLess'], function() {
	return gulp.watch(['./jsx/*.jsx', './less/insert.less', './less/background.index.less'], (event) => {
		if(event.path.indexOf('.jsx') !== -1) {
			return jsx2js(event.path);
		} else if(event.path.indexOf('insert.less') !== -1) {
			return insertLess2css();
		} else {
			return backgroundLess2css();
		}
  });
});