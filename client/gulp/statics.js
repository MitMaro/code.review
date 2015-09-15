module.exports = function(gulp, plugins, options, data) {
	return function() {

		var stream = gulp
			.src(data.statics.patterns, { base: 'src' })
		;

		if (options.watch) {
			stream = stream
				.pipe(plugins.plumber())
				.pipe(plugins.watch(data.statics.patterns, { base: 'public' }))
			;
			plugins.util.log('statics: starting watch');
		}

		// stream doesn't end when being watched
		stream.on('end', function() {
			plugins.util.log('statics: files copied');
		});

		return stream
			.pipe(plugins.size({showFiles: true}))
			.pipe(gulp.dest(options.destination));

	}
};
