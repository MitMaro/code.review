'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var envify = require('envify/custom');
var buildBundle = require('./helpers/buildBundle');
var help = require('./helpers/help');

help.registerTask(
	'build:bundle',
	'Builds the JavaScript system and copies the files into the destination',
	['clean'],
	['destination', 'hash', 'watch', 'debug']
);

module.exports = function registerBundleTask(gulp, plugins, options, data) {
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

	gulp.task('build:bundle', ['clean'], function bundleTask() {
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
	});
};
