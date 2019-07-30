// routes/Sockets/index.js

module.exports = ({ socket, io, morseService }) => {

	socket.on('CONNECT', (data) => {
		io.emit('USER_CONNECTED', data);
	});

	socket.on('disconnect', (data) => {
		io.emit('USER_DISCONNECTED', data);
	});

	socket.on('SEND_MESSAGE', (data) => {
		data.message = morseService.convertToMorseFromString(data.message);
		io.emit('RECEIVE_MESSAGE', data);
	});
};
