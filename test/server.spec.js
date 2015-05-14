'use strict';

var server = require('../server.js');
var schedule = require('../schedule.js');
var request = require('request');

var expect = require('chai').expect;
var sinon = require('sinon');

var TEST_PORT = 8100;

describe('server', function() {
	this.timeout(5000);
	
	before(function(done) {
		server.start(TEST_PORT, done);
	});
	
	after(function(done) {
		server.stop(done);
	});
	
	beforeEach(function() {
		sinon.stub(schedule, 'getNowNext');
		sinon.spy(request, 'post');
	});
	
	afterEach(function() {
		schedule.getNowNext.restore();
		request.post.restore();
	});
	
	it('should return an OK response to GET request to the nexmo endpoint', function(done) {
		request.get('http://localhost:' + TEST_PORT + '/nexmo', function(error, response) {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});
});