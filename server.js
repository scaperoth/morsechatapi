const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const socketRoutes = require('./api/routes/Sockets');

server.listen(process.env.PORT || 3000);

io.on('connection', function( client ) {
    socketRoutes.init(client);
});
