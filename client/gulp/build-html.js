'use strict';

var help = require('./helpers/help');

help.registerTask(
	'build:html',
	'Compiles the HTML template files and copies them to the destination',
	['clean'],
	['destination', 'hash']
);

module.exports = function registerHtmlTask(gulp, plugins, options, data) {
	gulp.task('build:html', ['clean'], function htmlTask() {
		return gulp.src(data.htmlPatterns)
			.pipe(plugins.template(data))
			.pipe(gulp.dest(options.destination));
	});
};
