module.exports = function(gulp, plugins, options, data) {
	return function() {
		return gulp.src(data.htmlPatterns)
			.pipe(plugins.template(data))
			.pipe(gulp.dest(options.destination));
	}
};
