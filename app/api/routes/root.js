"use strict";

var Gist = require("../gist/index");

module.exports = function route(request, response) {
	var gistId = request.params.gistId;
	var gist = new Gist(gistId);
	gist.blobs()
		.then(function (blobs) {
			response({
				id: gistId,
				links: {},
				files: blobs
			});
		})
		.catch(function (err) {
			console.error(err);
			response(err);
		});
};
