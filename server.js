'use strict';
global.__base = __dirname + '/';

var app = require('./index');
var http = require('http');


var server;

/*
 * Create and start HTTP server.
 */

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
