'use strict';

var browserify = require('browserify');
var envify = require('envify/custom');
var buildBundle = require('./helpers/buildBundle');

module.exports = function createBundleVendorTask(gulp, plugins, options, data) {
	var bundlePath = data.vendorBundle.output + data.hash + '.js';
	var envy = envify({
		NODE_ENV: options.debug ? 'development' : 'production',
		DEBUG: options.debug,
		global: true
	});
	var browserifyOptions = {
		debug: options.debug,
		transform: [envy]
	};

	return function bundleVendorTask() {
		var bundle = browserify(
			browserifyOptions
		);

		bundle.require(data.externals);

		return buildBundle(gulp, bundle, bundlePath, plugins, options);
	};
};
