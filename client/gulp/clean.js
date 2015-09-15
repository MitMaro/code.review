var del = require('del');

module.exports = function(gulp, plugins, options, data) {
	return function () {
		return del(data.cleanPatterns);
	}
};
