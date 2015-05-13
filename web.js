var express = require('express');

var app = express();

app.all('/nexmo', function(req, res) {
	console.log({ method: req.method, query: req.query, body: req.body });
	res.send(200, 'Message received');	
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});