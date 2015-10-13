'use strict';

var path = require('path');
var nodeBourbon = require('node-bourbon');
var help = require('./helpers/help');

help.registerTask(
	'build:sass',
	'Builds the Sass files and copies the files into the destination',
	['clean'],
	['destination', 'hash', 'watch', 'debug']
);

module.exports = function registerBuildSassTask(gulp, plugins, options, data) {
	gulp.task('build:sass', ['clean'], function buildSassTask() {
		// if watching then update bundle as they change
		if (options.watch) {
			gulp.watch(data.sass.pattern, function watch() {
				buildSass();
			});
			plugins.util.log('sass: starting watch');
		}
		buildSass();
	});

	function buildSass() {
		var stream;

		plugins.util.log('sass: building');
		stream = gulp
			.src(data.sass.pattern)
			.pipe(plugins.plumber())
			.pipe(plugins.rename(data.sass.output + data.hash + '.css'))
		;

		if (options.debug) {
			stream = stream.pipe(plugins.sourcemaps.init());
		}

		stream = stream
			.pipe(plugins.sass({
				includePaths: nodeBourbon.includePaths,
				precision: 10
			}))
		;

		if (options.debug) {
			stream = stream.pipe(plugins.sourcemaps.write());
		}
		else {
			// cannot minify in development as it breaks sourcemap
			stream = stream.pipe(plugins.minifyCss());
		}
		stream
			.pipe(plugins.size({showFiles: true}))
			.pipe(gulp.dest(path.join(options.destination, 'css')))
			.on('end', function end() {
				plugins.util.log('sass: build complete');
			})
		;
	}
};
