// jscs:disable disallowAnonymousFunctions, requirePaddingNewLinesInObjects
/* eslint-disable no-unused-expressions */
'use strict';

var expect = require('chai').expect;
var Gist = require('../../../app/api/gist/index');

describe('Gist', function () {
	describe('#blobs', function () {
		it('should return a list of blobs in the repo', function (done) {
			(new Gist('5ef3908f5b6728db2401')).blobs()
			.then(function (blobs) {
				expect(blobs).to.be.an('object');
				expect(Object.keys(blobs).length).to.equal(3);
				Object.keys(blobs).forEach(function (object) {
					var blob = blobs[object];

					expect(blob).to.have.all.keys('name', 'content');
				});
			})
			.done(done);
		});
	});
});
