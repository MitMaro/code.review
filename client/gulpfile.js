'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pkg = require('./package.json');
var argv = require('yargs').argv;
var help = require('./gulp/helpers/help');

var options = {
	command: argv._[0],
	watch: argv.watch || false,
	destination: argv.destination || './build',
	noClean: !argv.clean,
	coverage: argv.coverage || false,
	port: argv.port || 8000,
	production: argv.production || plugins.util.env.NODE_ENV === 'production',
	debug: argv.debug || !(argv.production || plugins.util.env.NODE_ENV === 'production'),
	bail: argv.bail || false
};

var data = {
	hash: argv.hash || (Math.floor(Math.random() * (1000000 - 100000)) + 100000).toString(),
	title: 'Code Review',
	root: '/',
	bundle: {
		patterns: './src/js/Index.jsx',
		output: 'bundle-'
	},
	vendorBundle: {
		output: 'vendor-bundle-'
	},
	htmlPatterns: [
		'./src/html/index.html'
	],
	cleanPatterns: [
		'build/**'
	],
	sass: {
		pattern: './src/sass/CodeReview.scss',
		output: 'code-review-'
	},
	statics: {
		patterns: [
			'./src/images/**/*'
		]
	},
	externals: Object.keys(pkg.dependencies)
};

function loadTasks(taskNames) {
	taskNames.forEach(function taskNameForEach(taskName) {
		require('./gulp/' + taskName)(gulp, plugins, options, data);
	});
}

help.registerArgument(
	'clean', 'Force a clean before running task.', 'false'
);
help.registerArgument(
	'debug', 'Forces a debug build.', 'false'
);
help.registerArgument(
	'hash', 'Used as a unique in various places during the build.', 'random integer'
);
help.registerArgument(
	'destination', 'The build files destination.', 'build'
);
help.registerArgument(
	'watch', 'Watch files for changes and rebuild.', 'false'
);
help.registerArgument(
	'port', 'The HTTP port to listen for connections.', '8000'
);

loadTasks([
	'help',
	'clean',
	'build-html',
	'build-vendor-bundle',
	'build-bundle',
	'build-sass',
	'build-statics',
	'build',
	'server'
]);

gulp.task('default', ['help']);

/*
gulp.task('server', 'Start the client development server', ['clean'], serverTask, {
	options: getHelpOptions(['watch', 'debug', 'destination', 'port'])
});

function serverTask(done) {
	var tasks = [
		task('bundle'),
		task('bundle-vendor'),
		task('html'),
		task('sass'),
		task('statics'),
		task('server')
	];

	async.parallel(tasks, done);
*/
