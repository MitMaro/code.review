var http = require('http');

var ecstatic = require('ecstatic');


module.exports = function(gulp, plugins, options, data) {
	return function (done) {
		var closeAttempt = false;
		var server = http.createServer(
			ecstatic({
				root: options.destination,
				cache: 'no-cache'
			})
		);

		// this will hold the server open on shutdown if not
		// set to a lower value
		server.addListener("connection",function(stream) {
			stream.setTimeout(1000);
		});

		server.on('close', function() {
			done();
			process.exit(0);
		});

		server.listen(options.port);

		plugins.util.log('Server running on http://localhost:' + options.port + '/');
		plugins.util.log('ctrl-c on any sane operation system to exit');

		process.on('SIGINT', function() {
			if (closeAttempt) {
				process.exit(1);
			}
			plugins.util.log('Shutting down server. Hit ctrl-c again to force');

			server.close();
			closeAttempt = true;
		});
	}
};
