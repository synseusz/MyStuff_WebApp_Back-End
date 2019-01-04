'use strict'
//message.add test
const message = require('../models/message')
const connData = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'database'
}
const messageData = {
	author: 'test@test.pl',
	recipient: 'user@user.com',
	subject: 'subject',
	message: 'message',
	dateAndTime: new Date()
}

test('add new message', (done) => {
	message.add(connData, messageData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
//message.getByRecipient test
const messageData2 = {
	recipient: 'test@test.com'
}
test('get message by recipient', (done) => {
	message.getByRecipent(connData, messageData2, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
