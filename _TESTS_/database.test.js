'use strict'
//db.connect test
const db = require('../database')
const connData = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'database'
}

test('connect to database', (done) => {
	db.connect(connData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
test('create tables', (done) => {
	db.createTables(connData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
