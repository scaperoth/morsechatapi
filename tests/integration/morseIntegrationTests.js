// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Integration Tests for Morse Routes", () => {
	describe("GET /morse", () => {
		it("should decrypt morse code character", (done) => {
			chai.request(app)
				.get('/morse/decrypt?message=.-')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					res.body.data.should.be.equal('a')
					done();
				});
		});

		it("should decrypt complicated morse code string", (done) => {
			chai.request(app)
				.get('/morse/decrypt?message=- . ... - | ... - .-. .. -. --.')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					res.body.data.should.be.equal('test string')
					done();
				});
		});

		it("should break if no query string given", (done) => {
			const id = 1;
			chai.request(app)
				.get(`/morse/decrypt`)
				.end((err, res) => {
					res.should.have.status(500);
					res.body.message.should.be.equal('No message given to decrypt')
					done();
				});
		});

	});
});
