"use strict";

var Gist = require("../gist/index");

module.exports = function route(request, response) {
	var gist = new Gist(request.params.gistId);
	gist.blobs()
		.then(function (blobs) {
			response(blobs);
		})
		.catch(function (err) {
			console.error(err);
			response(err);
		});
};
