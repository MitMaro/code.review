var browserify = require('browserify');
var watchify = require('watchify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');
var buildBundle = require('./helpers/buildBundle');

module.exports = function(gulp, plugins, options, data) {
	var bundlePath = data.vendorBundle.output + data.hash + '.js';
	var envy = envify({
		NODE_ENV: options.debug ? 'development' : 'production',
		DEBUG: options.debug,
		global: true
	});
	var browserifyOptions = {
		debug: options.debug,
		transform: [envy]
	}

	return function () {
		var bundle = browserify(
			browserifyOptions
		);

		bundle.require(data.externals);

		return buildBundle(gulp, bundle, bundlePath, plugins, options);
	}
};
