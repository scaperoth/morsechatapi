// routes/Sockets/index.js

module.exports = ({ socket, io, morseService, securityService }) => {

	socket.on('CONNECT', (data) => {
		try {
			securityService.signIn(data.username, socket);
			io.emit('USER_CONNECTED', data);
		} catch (err) {
			socket.emit("disconnect", { error: true });
		}
	});

	socket.on('disconnect', ({ error = false }) => {
		if (error) {
			return;
		}
		const response = securityService.signOut(socket);
		io.emit('USER_DISCONNECTED', response);
	});

	socket.on('SEND_MESSAGE', (data) => {
		try {
			securityService.validateToken(data.username, data.token);
			const ecnryptedMessage = morseService.convertToMorseFromString(data.message);
			io.emit('RECEIVE_MESSAGE', { ...data, message: ecnryptedMessage });
		} catch (err) {
			socket.emit("disconnect", { error: true });
			// if token is rejected, throw error for server logs
			console.log('Security Alert: ', JSON.stringify(data));
			console.log('--- error message: ', err.message);
		}
	});
};
