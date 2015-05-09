var gulp = require('gulp'),
	rename = require('gulp-rename'),
	size = require('gulp-size'),
	uglify = require('gulp-uglify'),
	postcss = require('gulp-postcss'),
	nested = require('postcss-nested');

gulp.task('js', function () {
	return gulp.src('src/*.js')
		.pipe(gulp.dest('dist'))
		.pipe(size({ showFiles: true }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(size({ showFiles: true }));
});

gulp.task('css', function () {
	return gulp.src('src/*.css')
		.pipe(postcss([
			nested()
		]))
		.pipe(gulp.dest('dist'))
		.pipe(size({ showFiles: true }));
});

gulp.task('dev', function () {
	gulp.watch('src/*.css', ['css']);
	gulp.watch('src/*.js', ['js']);
});

gulp.task('default', ['css', 'js']);
