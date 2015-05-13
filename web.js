var express = require('express');
var request = require('request');

var app = express();

app.get('/nexmo', function(req, res) {
	console.log({ method: req.method, query: req.query, body: req.body });
	res.send(200, 'Message received');
	request.post({
		uri: 'https://rest.nexmo.com/sms/json',
		json: true,
		body: {
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
			from: req.query.to,
			to: req.query.msisdn,
			text: 'Hello there'
		}		
	})
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});