var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');

module.exports = function(gulp, plugins, options, data) {
	var envy = envify({
		NODE_ENV: options.debug ? 'development' : 'production',
		DEBUG: options.debug
	});
	var watchifyOptions;
	var browserifyOptions = {
		debug: options.debug,
		transform: [envy, babelify]
	}

	if (options.watch) {
		browserifyOptions.cache = {};
		browserifyOptions.packageCache = {};
		watchifyOptions = {
			ignoreWatch: true,
			delay: 1500
		};
	}

	return function () {
		var bundle = browserify(
			data.bundle.patterns,
			browserifyOptions
		);

		if (options.watch) {
			watch = watchify(bundle, watchifyOptions);
			watch.on('update', function() {
				buildBundle(bundle);
			});
			plugins.util.log('browserify: starting watch');
		}

		return buildBundle(bundle);
	};

	function buildBundle(bundle) {
		plugins.util.log('browserify: building');

		var stream = bundle.bundle()
			.on('error', function(err) {
				if (err.description) {
					plugins.util.log(
						err.name + ':' + err.description + 'on line' + err.lineNumber + 'in file' + err.fileName
					);
				}
				else {
					plugins.util.log(err.message);
				}
			})
			.pipe(source(data.bundle.output + data.hash + '.js'))
			.pipe(buffer())
		;

		if (!options.debug) {
			stream = stream.pipe(plugins.uglify());
		}

		return stream
			.pipe(plugins.size({showFiles: true}))
			.pipe(gulp.dest(path.join(options.destination, 'js')))
			.on('end', function() {
				plugins.util.log('browserify: build complete');
			})
		;
	}
};
