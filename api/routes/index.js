// routes/Sockets/index.js

module.exports = ({ app, socket, io, domain }) => {

	app.all('*', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});
	
	require('./Morse')({ app, ...domain });
};
