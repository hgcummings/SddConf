var express = require('express');
var request = require('request');
var schedule = require('./schedule.js');

var server;

exports.start = function(port, callback) {
	var app = express();
	app.get('/nexmo', function(req, res) {
		res.status(200).send('Message received');
		schedule.getNowNext(function(error, result) {
			if (!error && (result[req.query.keyword])) {
				console.log('Sending response...');
				request.post({
					uri: 'https://rest.nexmo.com/sms/json',
					json: true,
					body: {
						api_key: process.env.API_KEY,
						api_secret: process.env.API_SECRET,
						from: req.query.to,
						to: req.query.msisdn,
						text: result[req.query.keyword]
					}		
				});
			} else {
				console.log(error, result);
			}
		});
	});
	
	server = app.listen(port, callback);
};

exports.stop = function(callback) {
	server.close(callback);
}