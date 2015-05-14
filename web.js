'use strict';

var server = require('./server.js');

server.start(process.env.PORT || 5000, require('./smsHandler.js'), function() {
	console.log('Server started...');
});