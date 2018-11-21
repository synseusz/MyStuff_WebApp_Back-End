'use strict'
//import user model
const user = require('./models/user')
//import our database model with all database operations
const db = require('./database')

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
			if(err){
				res.status(400)
				res.end('error:' + err)
				return
			}
			//if no error let's set proper response code and have a party
			res.status(201)
			res.end(JSON.stringify({message: 'user added successfully'}))
		})
	})

	//~~Database Routes~~
	server.post('/api/v1.0/admin/createTables', (req, res) => {

		db.createTables(databaseData, (err) => {
			if(err) {
				res.status(400)
				res.end('an error has occured:' + err)
				return
			}
			res.status(200)
			res.end('tables were created successfully')
		})
	})
}
