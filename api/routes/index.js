// routes/Sockets/index.js

module.exports = ({ app, socket, io, domain }) => {

	require('./Morse')({ app, ...domain });
};
