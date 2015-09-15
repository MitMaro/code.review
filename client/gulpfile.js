'use strict';
var gulp = require('gulp-help')(require('gulp'));
var plugins = require('gulp-load-plugins')();

var argv = require('yargs').argv;

var options = {
	watch: argv.watch,
	destination: argv.destination || './build',
	coverage: argv.coverage,
	port: argv.port || 8000,
	production: argv.production || plugins.util.env.NODE_ENV === 'production',
	debug: argv.debug || !(argv.production || plugins.util.env.NODE_ENV === 'production'),
	bail: argv.bail,
};

var data = {
	hash: (Math.floor(Math.random() * (1000000 - 100000)) + 100000).toString(),
	title: 'Code Review',
	root: '/',
	bundle: {
		patterns: './src/js/Index.jsx',
		output: 'bundle-'
	},
	htmlPatterns: [
		'./src/html/index.html'
	],
	cleanPatterns: [
		'build/**'
	],
	sass: {
		pattern: './src/sass/CodeReview.sass',
		output: 'code-review-'
	},
	statics: {
		patterns: [
			'./src/images/**/*'
		]
	}
};

	
function task(taskName) {
	return require('./gulp/' + taskName)(gulp, plugins, options, data)
}

gulp.task('clean', 'Remove all build files', [], task('clean'));

gulp.task('html', 'Build the html files', ['clean'], task('html'), {
	options: {
		destination: 'Sets the destination folder for the build. Default: ./build'
	}
});

gulp.task('sass', 'Compile the SASS files into css', ['clean'], task('sass'), {
	options: {
		watch: 'Causes a rebuild on file modification',
		debug: 'Forces debug output of build',
		destination: 'Sets the destination folder for the build. Default: ./build'
	}
});

gulp.task('statics', 'Copy static files to build', ['clean'], task('statics'), {
	options: {
		watch: 'Causes a rebuild on file modification'
	}
});

gulp.task('bundle', 'Create JavaScript bundles', ['clean'], task('bundle'), {
	options: {
		watch: 'Causes a rebuild on file modification',
		debug: 'Forces debug output of build',
		destination: 'Sets the destination folder for the build. Default: ./build'
	}
});

gulp.task('build', 'Build the whole project', ['clean', 'bundle', 'html', 'sass', 'statics']);
