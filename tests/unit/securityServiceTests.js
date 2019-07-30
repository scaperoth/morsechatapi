const assert = require('assert');
const chai = require('chai');
const securityService = require('../../api/domain/security.service')({
	userLimit: 2
});

describe('Security Service test suite', function () {

	it('should be able to log in and log out user', function () {
		securityService.signIn('username', 1);
		const beforeUserCount = securityService.getUsers().length;
		assert.equal(beforeUserCount, 1);

		securityService.signOut(1);
		const afterUserCount = securityService.getUsers().length;
		assert.equal(afterUserCount, 0);
	});

	it('should fail if two users with same username sign in', function () {
		securityService.signIn('username', 'socket');
		chai.expect(() => securityService.signIn('username', 'socket2')).to.throw();
		securityService.signOut('socket');
	});

	it('should fail if two users with same username sign in regardless of case', function () {
		securityService.signIn('username', 'socket');
		chai.expect(() => securityService.signIn('Username', 'socket2')).to.throw();
		securityService.signOut('socket');
	});

	it('should fail if too many users try to log in', function () {
		securityService.signIn('username', 'socket');
		securityService.signIn('username2', 'socket2');
		chai.expect(() => securityService.signIn('username3', 'socket3')).to.throw();
		securityService.signOut('socket');
		securityService.signOut('socket2');
	});

	it('should fail if token not valid', function () {
		securityService.signIn('username', 'socket');
		chai.expect(() => securityService.validateToken('username', 'wrongtoken')).to.throw();
		securityService.signOut('socket');
	});

	it('should be able to validate token', function () {
		const { token } = securityService.signIn('username', 'socket');
		securityService.validateToken('username', token);
		securityService.signOut('socket');
	});

	it('should be able to update token after validation', function () {
		const { token } = securityService.signIn('username', 'socket');
		const newToken = securityService.updateToken('username', token);
		securityService.validateToken('username', newToken);
		securityService.signOut('socket');
	});
});
