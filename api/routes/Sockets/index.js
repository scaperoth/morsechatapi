// routes/Sockets/index.js

module.exports = ({ client }) => {
	socket.on('CONNECT', (data) => {
		io.emit('USER_CONNECTED', data);
	});

	client.on('DISCONNECT', (data) => {
		io.emit('USER_DISCONNECTED', data);
	});

	socket.on('SEND_MESSAGE', (data) => {
		io.emit('RECEIVE_MESSAGE', data);
	});
};
