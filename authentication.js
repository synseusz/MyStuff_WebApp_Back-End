'use strict'

const db = require('./database')
const auth = require('basic-auth')
const bcrypt = require('bcrypt')

exports.userLogin = (conData, request, callback) => {

	//first check if basic authorization is present
	if (!request.headers.authorization || request.headers.authorization.indexOf('Basic') === -1) {
		//throw new Error('authorization header missing')
		const err = { message: 'authorization header missing' }
		console.log('Error:' + err.message)
		callback(err)
		return
	}

	const userData = auth(request)

	//if no userData
	if (!userData) {
		//throw new Error('missing email and/or password')
		const err = { message: 'missing username and/or password' }
		console.log('Error:' + err.message)
		callback(err)
		return
	}

	//connect to the database to check if such email and passwd exists
	db.connect(conData, (err, data) => {

		//when done check for any error
		if (err) {
			console.log('error in connecting to db')
			callback(err)
			return
		}

		//####~Query~#####
		data.query('SELECT password FROM users WHERE email=?', userData.name, (err, response) => {
			if (err) {
				callback(err)
				return
			}
			else if (response.length === 0) {
				callback(new Error("authorization failed"))
			}

			else {
				const valid = bcrypt.compareSync(userData.pass, response[0].password)
				if (valid) {
					data.query('SELECT id FROM users WHERE email=?', userData.name, (err, result) => {
						if (err) {
							console.log('error in executing the query')
							callback(err)
							return
						}
						if (result && result.length > 0)
							callback(null, { userId: result[0].id, login: true })
					})
				}
				else
					callback({ login: false })
			}
		})
	})
}
