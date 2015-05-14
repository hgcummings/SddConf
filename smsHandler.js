'use strict';

var request = require('request');
var schedule = require('./schedule.js');

module.exports.handle = function(message) {
	schedule.getNowNext(function(error, result) {
		if (!error && (result[message.keyword])) {
			console.log('Sending response...');
			request.post({
				uri: 'https://rest.nexmo.com/sms/json',
				json: true,
				body: {
					api_key: process.env.API_KEY,
					api_secret: process.env.API_SECRET,
					from: message.to,
					to: message.from,
					text: result[message.keyword]
				}		
			});
		} else {
			console.log(error, result);
		}
	});
};