'use strict';

var server = require('../server.js');
var smsHandler = require('../smsHandler.js');
var request = require('request');

var expect = require('chai').expect;
var sinon = require('sinon');

var TEST_PORT = 8100;

describe('server', function() {
	var smsHandler = {
		handle: sinon.spy()
	}
	
	before(function(done) {
		smsHandler.handle.reset();
		server.start(TEST_PORT, smsHandler, done);
	});
	
	after(function(done) {
		server.stop(done);
	});
		
	it('should return an OK response to GET request to the nexmo endpoint', function(done) {
		request.get('http://localhost:' + TEST_PORT + '/nexmo', function(error, response) {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});
	
	it('should handle SMS messages', function(done) {
		request.get('http://localhost:' + TEST_PORT + '/nexmo?keyword=NEXT&msisdn=12345', function(error, response) {
			expect(response.statusCode).to.equal(200);
			expect(smsHandler.handle.calledOnce).to.be.true;
			done();
		});
	});
});