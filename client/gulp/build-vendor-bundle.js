'use strict';

var browserify = require('browserify');
var envify = require('envify/custom');
var buildBundle = require('./helpers/buildBundle');
var help = require('./helpers/help');

help.registerTask(
	'build:vendor-bundle',
	'Builds the vendor JavaScript bundle',
	['clean'],
	['debug', 'destination', 'hash']
);

module.exports = function registerBundleVendorTask(gulp, plugins, options, data) {
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

	gulp.task('build:vendor-bundle', ['clean'], function bundleVendorTask() {
		var bundle = browserify(
			browserifyOptions
		);

		bundle.require(data.externals);

		return buildBundle(gulp, bundle, bundlePath, plugins, options);
	});
};
