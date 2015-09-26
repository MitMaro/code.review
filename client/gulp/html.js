'use strict';

module.exports = function createHtmlTask(gulp, plugins, options, data) {
	return function htmlTask() {
		return gulp.src(data.htmlPatterns)
			.pipe(plugins.template(data))
			.pipe(gulp.dest(options.destination))
		;
	};
};
