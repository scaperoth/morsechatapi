const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const socketRoutes = require('./api/routes/Sockets');
const routes = require('./api/routes');
const domain = require('./api/domain')();

server.listen(process.env.PORT || 8080);

io.on('connection', function (socket) {
	socketRoutes({ socket, io, ...domain });
});

routes({ app, domain });

module.exports = app;
