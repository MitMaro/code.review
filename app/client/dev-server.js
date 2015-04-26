var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
  ecstatic({ root: __dirname + '/../../build/client' })
).listen(8080);

console.log('Client Server Listening on localhost:8080');
