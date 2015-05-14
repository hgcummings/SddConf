'use strict';

var request = require('request');
var cheerio = require('cheerio');

module.exports.getNowNext = function(callback) {
	console.log('Getting now and next sessions');
	request.get('http://sddconf.com/agenda/', function(error, response, body) {
		if (error) {
			callback(error);
		}
		
		console.log('loading HTML');
		var $ = cheerio.load(body);
		console.log('finding current day');
		var today, currentDate = new Date();
		$('.agendadate').each(function(i, elem) {
			if (new Date(Date.parse($(elem).text())) < currentDate) {
				today = $(elem);
			}
		});
		
		var upcoming, current = today;
		while ((upcoming = current.next('.timegroup'))) {
			var startTime = upcoming.find('.starttime').text();
			if (startTime.length === '0:00'.length) {
				startTime = '0' + startTime;
			}
			if (startTime > currentDate.toTimeString() || startTime < current.find('.starttime').text()) {
				break;
			}
			current = upcoming;
		}
		
		var getTitles = function (timegroup) {
			var presentations = timegroup.find('.presentation');
			return presentations.map(function(i, elem) {
				return $(elem).text().substr(0, 320 / presentations.length);
			}).get().join('\n');
		};
		
		callback(null, {
			NOW: getTitles(current),
			NEXT: getTitles(upcoming)
		});
	});
};