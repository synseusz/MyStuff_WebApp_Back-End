'use strict'
const user = require('../models/user')
const connData = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'database'
}
const userData = {
	email: 'test@test.com',
	password: '12345',
	registrationDate: new Date()
}

//user.addUser function test
test('adding a new user', (done) => {
	user.addUser(connData, userData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
