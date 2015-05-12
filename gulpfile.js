var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	nested = require('postcss-nested'),
	autoprefixer = require('autoprefixer-core');

gulp.task('js', function () {
	return gulp.src(['src/[^_]*.js', 'src/plugins/[^_]*.js'])
		.pipe($.concat('martin.js'))
		.pipe(gulp.dest('dist'))
		.pipe($.size({ showFiles: true }))
		.pipe($.rename({ suffix: '.min' }))
		.pipe($.uglify())
		.pipe(gulp.dest('dist'))
		.pipe($.size({ showFiles: true }));
});

gulp.task('css', function () {
	return gulp.src(['src/[^_]*.css', 'src/plugins/[^_]*.css'])
		.pipe($.postcss([
			nested(),
			autoprefixer('last 4 versions')
		]))
		.pipe(gulp.dest('dist'))
		.pipe($.size({ showFiles: true }));
});

gulp.task('dev', function () {
	gulp.start('build');
	gulp.watch('src/**/*.css', function () {
		del('dist/*.css', function () {
			gulp.start('css');
		});
	});
	gulp.watch('src/**/*.js', function () {
		del('dist/*.js', function () {
			gulp.start('js');
		});
	});
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['build']);
