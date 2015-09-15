var path = require('path');
var nodeBourbon = require('node-bourbon');

module.exports = function(gulp, plugins, options, data) {
	return function() {
		// if watching then update bundle as they change
		if (options.watch) {
			gulp.watch(data.sass.pattern, function() {
				buildSass();
			});
			plugins.util.log('sass: starting watch');
		}
		buildSass();
	};

	function buildSass() {
		plugins.util.log('sass: building');
		var stream = gulp
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
			.on('end', function() {
				plugins.util.log('sass: build complete');
			})
		;
	}

};
