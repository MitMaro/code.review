"use strict";

var Hapi = require("hapi");

var server = new Hapi.Server();
server.connection({
	host: "localhost",
	port: process.env.PORT || 8888
});

server.route({
	method: "GET",
	path: "/{gistId}",
	handler: require("./routes/root")
});

server.start(function () {
	console.log("API running on port %s", server.info.port);
});
