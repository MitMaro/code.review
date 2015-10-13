'use strict';

var help = require('./helpers/help');

help.registerTask(
	'build',
	'Builds the whole project in parallel',
	['clean', 'build:bundle', 'build:vendor-bundle', 'build:html', 'build:sass', 'build:statics']
);

module.exports = function registerBuildTask(gulp) {
	gulp.task(
		'build',
		['clean', 'build:bundle', 'build:vendor-bundle', 'build:html', 'build:sass', 'build:statics']
	);
};
