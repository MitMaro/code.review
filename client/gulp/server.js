'use strict';
/* eslint-disable no-process-exit */

var http = require('http');
var ecstatic = require('ecstatic');
var help = require('./helpers/help');

help.registerTask(
	'server',
	'Run an http server for the client side build',
	['build'],
	['port']
);

module.exports = function createServerTask(gulp, plugins, options) {
	gulp.task('server', ['build'], function serverTask(done) {
		var closeAttempt = false;
		var httpServer = http.createServer(
			ecstatic({
				root: options.destination,
				cache: 'no-cache'
			})
		);

		// this will hold the server open on shutdown if not
		// set to a lower value
		httpServer.addListener('connection', function serverConnection(stream) {
			stream.setTimeout(1000);
		});

		httpServer.on('close', function serverClose() {
			done();
			process.exit(0);
		});

		httpServer.listen(options.port);

		plugins.util.log('Server running on http://localhost:' + options.port + '/');
		plugins.util.log('ctrl-c on any sane operation system to exit');

		process.on('SIGINT', function sigint() {
			if (closeAttempt) {
				process.exit(1);
			}
			plugins.util.log('Shutting down server. Hit ctrl-c again to force');

			httpServer.close();
			closeAttempt = true;
		});
	});
};
