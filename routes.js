'use strict'
//import user model
const user = require('./models/user')
//import database model with all database operations
const db = require('./database')
//import loginTracking model with login auth
const login = require('./models/loginTracking')

/* eslint-disable no-magic-numbers */

//Function for all routes
exports.allRoutes = function(databaseData, server) {

	//~~User Routes~~
	server.post('/api/v1.0/users', (req, res) => {

		//ectract data from request
		const userData = {
			email: req.body['email'],
			password: req.body['password'],
			registrationDate: new Date()
		}
		//we are atempting to add a user
		user.add(databaseData, userData, (err) => {

			res.setHeader('content-type', 'application/json')
			res.setHeader('accepts', 'GET, POST')
			//when adding a user is done, this code will run
			//if we got an error informs the client and set the proper response code
			if (err) {
				res.status(400)
				res.end('error:' + err)
				return
			}
			//if no error let's set proper response code and have a party
			res.status(201)
			res.end(JSON.stringify({ message: 'user added successfully' }))
		})
	})

	//####~~~ Log In Route ~~####
	server.post('/api/v1.0/login', (req, res) => {

		//we are atempting to add a new login activity
		login.add(databaseData, req, (err, data) => {

			res.setHeader('Access-Origin-Allow-Headers', ['Authorization'])
			res.setHeader('content-type', 'application/json')
			res.setHeader('accepts', 'POST')

			//if we got an error informs the client and set the proper response code
			if (err) {
				if (err.login === false) {
					//if error object has got login field that means the error is
					//un-authenticated username and password
					//so we need to send proper response code for this error
					res.status(401)
					res.end(JSON.stringify({ message: 'wrong username or password' }))
				} else {
					//otherwise another type of errors has occured
					res.status(400)
					res.end('error:' + err)
				}

				return
			}

			//if no errors at all then let's set proper response code
			res.status(201)
			res.end(JSON.stringify(data))
		})
	})

	//~~Database Routes~~
	server.post('/api/v1.0/admin/createTables', (req, res) => {

		db.createTables(databaseData, (err) => {
			if (err) {
				res.status(400)
				res.end('an error has occured:' + err)
				return
			}
			res.status(200)
			res.end('tables were created successfully')
		})
	})
}
