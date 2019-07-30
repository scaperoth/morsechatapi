// api/domain/user.service.js

module.exports = ({ userLimit = 10 }) => {

	const { RemoveItemFromArrayByKey } = require('../utilities/arrayUtilities');
	let currentUsers = [];

	/**
	 * checks user token again given value to make sure
	 * the correct user is sending the message
	 * @param  {String} username username to compare
	 * @param  {String} token    previous security token from user
	 * @return {bool}          true if valid and throws error if now
	 */
	const validateToken = (username, token) => {

		if(!username){
			throw new Error('No username given');
		}

		if(!token){
			throw new Error('No token given');
		}

		username = username.toLowerCase();
		const user = currentUsers.find(u => u.username === username);
		if (!user) {
			throw new Error('User does not exist');
		}

		if (user.token !== token) {
			throw new Error('Invalid user token');
		}

		return true;
	}

	/**
	 * sets a new token for the user after validation
	 * @param {String} username username to update token for
	 */
	const updateToken = (username, token) => {

		if(!username){
			throw new Error('No username given');
		}

		if(!token){
			throw new Error('No token given');
		}

		username = username.toLowerCase();
		validateToken(username, token);

		const userIdx = currentUsers.findIndex(u => u.username === username);
		if (userIdx < 0) {
			throw new Error('User does not exist');
		}

		const newToken = createToken();
		currentUsers[userIdx].token = createToken();

		return newToken;
	}

	/**
	 * creates a new security token
	 * @return {String} token used for security validation
	 */
	const createToken = () => {
		return Date.parse(new Date());
	}

	/**
	 * tries to sign in user if space is available
	 * @param  {String} username user to log in
	 * @return {Object}          username and status
	 */
	const signIn = (username, socket) => {

		if(!username){
			throw new Error('No username given');
		}

		if(!socket){
			throw new Error('No socket given');
		}

		username = username.toLowerCase();
		if (currentUsers.length >= userLimit) {
			throw new Error('Too many users logged in');
		}

		const userExists = currentUsers.find(u => u.username === username);
		if (userExists) {
			throw new Error('User already exists');
		}

		const token = createToken();
		const newUserInfo = { username, token, socket };
		currentUsers.push(newUserInfo);

		return {
			username,
			token,
			status: 'loggedin'
		};
	};

	/**
	 * tries to sign out user
	 * @param  {String} username user to log out
	 * @return {Object}          username and status
	 */
	const signOut = (socket) => {

		if(!socket){
			throw new Error('No socket given');
		}

		const user = currentUsers.find(u => u.socket === socket);
		if (!user) {
			throw new Error('User not logged in');
		}

		currentUsers = RemoveItemFromArrayByKey(currentUsers, { username: user.username }, 'username')

		return {
			username: user.username,
			status: 'loggedout'
		};
	};

	const getUsers = () => {
		return currentUsers;
	}

	return {
		signIn,
		signOut,
		validateToken,
		updateToken,
		createToken,
		getUsers
	};
};
