'use strict';

var Netmask = require('netmask').Netmask;

// See https://nexmo.zendesk.com/entries/23181071-Source-IP-subnet-for-incoming-traffic-in-REST-API
var whitelist = [new Netmask('174.37.245.32/29'), new Netmask('174.36.197.192/28'),
                new Netmask('173.193.199.16/28'), new Netmask('119.81.44.0/28')];

module.exports = function checkIp(request, response, next) {
    if (!request.query.msisdn) {
        // Not an SMS message
        next();
        return;
    }
    
    // Only look at the last non-local IP in the chain, since this is set by the host router
    // The rest of the chain could come from anywhere (and would be trivial to spoof)
    var header = request.header('X-Forwarded-For');
    var forwardChain = header.split(',');
    var lastForwardedIp = forwardChain.pop();
    var localSubnet;

    if (process.env.LOCAL_SUBNET) {
        localSubnet = new Netmask(process.env.LOCAL_SUBNET);
    }

    if (localSubnet && localSubnet.contains(lastForwardedIp) && forwardChain.length) {
        lastForwardedIp = forwardChain.pop();
    }

    if (lastForwardedIp && whitelist.some(function(mask) { return mask.contains(lastForwardedIp); })) {
        next();
    } else {
        console.info('Stopped processing request from non-whitelisted IP: ' + lastForwardedIp +
            ' (Forward chain:' + header +')');
        // Should really return a 404 here, but we need to send back a 200 to nexmo's *web* servers (which aren't on the
        // same subnet as the whitelisted gateway servers) in order for them to recognise our endpoint as a valid one.
        response.status(403).send('');
    }
};