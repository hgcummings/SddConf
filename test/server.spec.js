'use strict';

var server = require('../server.js');
var request = require('request');

var expect = require('chai').expect;
var sinon = require('sinon');
var cases = require('cases');

var TEST_PORT = 8100;

describe('server', function() {
	var smsHandler = {
		handle: sinon.spy()
	};
	
	before(function(done) {
		server.start(TEST_PORT, smsHandler, done);
	});
	
	beforeEach(function() {
		smsHandler.handle.reset();
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
	
	describe('IP filtering', function() {
        var INVALID_IP = '173.194.70.102';
        var LOCAL_IP = '10.10.2.50';
				
		var makeRequest = function forwardedFor(ipAddresses, callback) {
			var oldLocalSubnet = process.env.LOCAL_SUBNET;
            process.env.LOCAL_SUBNET = '10.10.2.0/24';
			request.get({
				uri: 'http://localhost:' + TEST_PORT + '/nexmo?keyword=NEXT&msisdn=12345',
				headers: {
					'X-Forwarded-For': ipAddresses.join(',')
				}				
			}, function() {
				if (oldLocalSubnet === undefined) {
                    delete process.env.LOCAL_SUBNET;
                } else {
                    process.env.LOCAL_SUBNET = oldLocalSubnet;
                }
				callback.apply(this, arguments);
			});
		};
		
		it('should handle SMS messages from trusted IPs',
			cases([['174.37.245.36'], ['174.36.197.200'], ['173.193.199.25'], ['119.81.44.8']], function(validIp, done) {
				smsHandler.handle.reset();
				makeRequest([validIp, LOCAL_IP], function(error, response) {
					expect(response.statusCode).to.equal(200);
					expect(smsHandler.handle.calledOnce).to.be.true;
					done();
				});
			})
		);
		
		it('should not handle SMS messages from untrusted IPs', function(done) {
			makeRequest([INVALID_IP, LOCAL_IP], function(error, response) {
				expect(response.statusCode).to.equal(403);
				expect(smsHandler.handle.called).to.be.false;
				done();
			});
		});
	});
});