
var help = {
	watch: 'Causes a rebuild on file modification',
	debug: 'Forces debug output of build',
	destination: 'Sets the destination folder for the build. Default: ./build',
	port: 'Port for the server to listen on. Default: 8080'
};


module.exports = function (keys) {
	var i;
	var options = {};

	for (i = 0; i < keys.length; i++) {
		options[keys[i]] = help[keys[i]];
	}

	return options;
};
