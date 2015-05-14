var server = require('./server.js');

server.start(process.env.PORT || 5000, function() {
	console.log("Server started...");
});