var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	template = ['/*!',
				' * <%= name %> <%= version %>',
				' * <%= homepage %>',
				' * Copyright <%= new Date().getFullYear() %> <%= author %>',
				' */\n\n'].join('\n');

gulp.task('js', function () {
	var pkg = JSON.parse(require('fs').readFileSync('package.json'));
	return gulp.src('src/[^_]*.js')
		.pipe($.concat('martin.js'))
		.pipe($.header(template, pkg))
		.pipe(gulp.dest('dist'))
		.pipe($.size({ showFiles: true }))
		.pipe($.rename({ suffix: '.min' }))
		.pipe($.uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest('dist'))
		.pipe($.size({ showFiles: true }));
});

gulp.task('css', function () {
	var pkg = JSON.parse(require('fs').readFileSync('package.json'));
	return gulp.src(['src/[^_]*.css', 'src/plugins/[^_]*.css'])
		.pipe($.postcss([
			require('postcss-nested'),
			require('autoprefixer')('last 4 versions')
		]))
		.pipe($.csscomb())
		.pipe($.header(template, pkg))
		.pipe(gulp.dest('dist'))
		.pipe($.size({ showFiles: true }));
});

gulp.task('dev', function () {
	gulp.start('build');
	gulp.watch(['package.json', 'src/**/*.css'], ['css']);
	gulp.watch(['package.json', 'src/**/*.js'], ['js']);
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['build']);
