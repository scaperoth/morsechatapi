// routes/Sockets/index.js

module.exports = ({ app, morseService }) => {
	app.route(`/morse/decrypt`)
		.get(async function (request, response) {
			try {
				const { message } = request.query;
				if (!message) {
					throw new Error('No message given to decrypt');
				}
				const result = morseService.convertToStringFromMorse(message);

				response.json(result);

			} catch (err) {
				response
					.status(err.httpStatusCode || 500)
					.json({
						message: err.message,
						error: err
					}).end();
			}
		});

	app.route(`/morse/encrypt`)
		.get(async function (request, response) {
			try {
				const { message } = request.query;
				if (!message) {
					throw new Error('No message given to encrypt');
				}
				const result = morseService.convertToMorseFromString(message);

				response.json(result);

			} catch (err) {
				response
					.status(err.httpStatusCode || 500)
					.json({
						message: err.message,
						error: err
					}).end();
			}
		});
};
