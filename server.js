'use strict';

var express = require('express');
var request = require('request');

var server;

exports.start = function(port, smsHandler, callback) {	
	var app = express();
	app.get('/nexmo', function(req, res) {
		res.status(200).send('Message received');
		if (req.query.msisdn) {
			smsHandler.handle({
				from: req.query.msisdn,
				to: req.query.to,
				keyword: req.query.keyword
			});
		}
	});
	
	server = app.listen(port, callback);
};

exports.stop = function(callback) {
	server.close(callback);
};