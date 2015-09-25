var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');

module.exports = function buildBundle(gulp, bundle, outputPath, plugins, options) {
	plugins.util.log('browserify: building ' + outputPath);

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
		.pipe(source(outputPath))
		.pipe(buffer())
	;

	if (!options.debug) {
		stream = stream.pipe(plugins.uglify());
	}

	return stream
		.pipe(plugins.size({showFiles: true}))
		.pipe(gulp.dest(path.join(options.destination, 'js')))
		.on('end', function() {
			plugins.util.log('browserify: build complete ' + outputPath);
		})
	;
};
