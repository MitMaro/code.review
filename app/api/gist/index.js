"use strict";

var Promise = require("bluebird");
var NodeGit = require("nodegit");
var sprintf = require("sprintf-js").sprintf;

var Gist = function Gist(id) {
	this._id = id;
	this._path = sprintf("/tmp/%s", id);
	this._uri = Gist.uri(id);
};

Gist.uri = sprintf.bind(sprintf, "https://gist.github.com/%s.git");

Gist.prototype._download = function _download() {
	return NodeGit.Clone.clone(this._uri, this._path, {
		remoteCallbacks: {
			certificateCheck: function certificateCheck() {
				return 1;
			}
		}
	});
};

Gist.prototype._master = function _master() {
	var self = this;
	return this._download()
	.catch(function openExistingRepo() {
		return NodeGit.Repository.open(self._path);
	})
	.then(function getMasterCommit(repo) {
		return repo.getReferenceCommit("master");
	});
};

Gist.prototype._getBlobs = function getBlobs(commit) {
	return commit.getTree()
	.then(function (tree) {
		var entries = tree.entries();
		var blobs = Object.create(null);
		return Promise.map(entries, function (entry) {
			return entry.getBlob()
			.then(function getBlobContent(blob) {
				return blob.content();
			})
			.then(function addBlobEntry(content) {
				blobs[entry.sha()] = {
					name: entry.path(),
					content: content
				};
			});
		})
		.then(function getBlobs() {
			return blobs;
		});
	});
};

Gist.prototype.blobs = function blobs() {
	var self = this;
	return this._master()
	.then(function getBlobsFromMaster(commit) {
		return self._getBlobs(commit);
	});
};

module.exports = Gist;