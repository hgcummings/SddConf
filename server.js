'use strict';

var express = require('express');
var ipFilter = require('./ipFilter.js');

var server;

exports.start = function(port, smsHandler, callback) {	
	var app = express();
	app.use('/nexmo', ipFilter);
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