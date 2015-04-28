'use strict';
/*eslint-disable no-console */

var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');

http.createServer(
	ecstatic({
		root: path.resolve(__dirname, '/../../build/client')
	})
).listen(8080);

console.log('Client Server Listening on localhost:8080');
