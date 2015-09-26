'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var envify = require('envify/custom');
var buildBundle = require('./helpers/buildBundle');

module.exports = function createBundleTask(gulp, plugins, options, data) {
	var bundlePath = data.bundle.output + data.hash + '.js';
	var envy = envify({
		NODE_ENV: options.debug ? 'development' : 'production',
		DEBUG: options.debug,
		global: true
	});
	var watchifyOptions;
	var browserifyOptions = {
		debug: options.debug,
		transform: [envy, babelify]
	};

	if (options.watch) {
		browserifyOptions.cache = {};
		browserifyOptions.packageCache = {};
		watchifyOptions = {
			ignoreWatch: true,
			delay: 1500
		};
	}

	return function bundleTask() {
		var watch;
		var bundle = browserify(
			data.bundle.patterns,
			browserifyOptions
		);

		bundle.external(data.externals);
		
		if (options.watch) {
			watch = watchify(bundle, watchifyOptions);
			watch.on('update', function watchUpdate() {
				return buildBundle(gulp, bundle, bundlePath, plugins, options);
			});
			plugins.util.log('browserify: starting watch');
		}
		return buildBundle(gulp, bundle, bundlePath, plugins, options);
	};
};
