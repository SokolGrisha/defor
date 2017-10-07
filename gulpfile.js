'use strict';

const fs = require('fs');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const browserify = require('browserify');
const babelify = require('babelify');
const vueify = require('vueify');
const source = require('vinyl-source-stream');

const isDev = process.env.DEV !== 'production';

var errorMessage = () => {
	return plumber({errorHandler: notify.onError((err) => {
		return {
			title: err.name,
			message: err.message
		}
	})})
}

gulp.task('dev', () => {
	return browserify({ entries: 'dev/index.js'})
		.transform(babelify, { presets: ['es2015'] })
		.transform(vueify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./static'))
});

gulp.task('watch', () => {
	gulp.watch('./dev/**/*.*', ['dev']);
});


gulp.task('default', ['dev', 'watch']);
