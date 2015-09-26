'use strict';

var del = require('del');

module.exports = function createCleanTask(gulp, plugins, options, data) {
	return function cleanTask() {
		return del(data.cleanPatterns);
	};
};
