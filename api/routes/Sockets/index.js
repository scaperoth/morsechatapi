// routes/Sockets/index.js

module.exports = ({ socket, io, morseService, securityService }) => {

	socket.on('CONNECT', (data, cb) => {
		try {
			const response = securityService.signIn(data.username, socket);
			io.emit('USER_CONNECTED', {username: data.username});
			cb(response);
		} catch (err) {
			cb({ error: err.message });
			socket.disconnect();
		}
	});

	socket.on('disconnect', () => {
		try {
			const response = securityService.signOut(socket);
			io.emit('USER_DISCONNECTED', response);
		} catch (err) {
			console.log(err);
		}
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
