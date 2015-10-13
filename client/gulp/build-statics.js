'use strict';

var help = require('./helpers/help');

help.registerTask(
	'build:statics',
	'Copy static files into the destination',
	['clean'],
	['destination', 'watch']
);

module.exports = function registerStaticsTask(gulp, plugins, options, data) {
	gulp.task('build:statics', ['clean'], function staticsTask() {
		plugins.util.log('statics: building');
		if (options.watch) {
			plugins.watch(data.statics.patterns, {base: 'public'}, function watch() {
				buildStatics();
			});
			plugins.util.log('statics: starting watch');
		}

		return buildStatics();
	});

	function buildStatics() {
		var stream = gulp
			.src(data.statics.patterns, {base: 'src'})
		;

		// stream doesn't end when being watched
		stream.on('end', function streamEnd() {
			plugins.util.log('statics: files copied');
		});

		return stream
			.pipe(plugins.size({showFiles: true}))
			.pipe(gulp.dest(options.destination))
		;
	}
};
