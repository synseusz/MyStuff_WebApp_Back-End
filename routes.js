'use strict'

const user = require('./models/user')
const db = require('./database')
const login = require('./models/loginTracking')
const advert = require('./models/advert')
const message = require('./models/message')
//package for parsing files, in this case images.
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/img')
	},

	filename: function(req, file, callback) {
		callback(null, file.originalname)
	}
})

const upload = multer({ storage: storage })


/* eslint-disable no-magic-numbers */

//Function for all routes
exports.allRoutes = function(databaseData, server) {


	//###########################################################\\
	//#						SIGN UP	ROUTE						#\\
	//###########################################################\\
	server.post('/api/v1.0/users', (req, res) => {

		const userData = {
			email: req.body['email'],
			password: req.body['password'],
			registrationDate: new Date()
		}
		user.uniqueValidator(databaseData, userData.email, (err) => {
			if (err) {
				res.status(400)
				res.end(err.toString())
				return
			} else {
				user.add(databaseData, userData, (err) => {

					res.setHeader('content-type', 'application/json')
					res.setHeader('accepts', 'GET, POST')

					if (err) {
						res.status(400)
						res.end('error:' + err)
						return
					}

					res.status(201)
					res.end(JSON.stringify({ message: 'user added successfully' }))
				})
			}
		})

	})

	//###########################################################\\
	//#						LOG IN ROUTE						#\\
	//###########################################################\\
	server.post('/api/v1.0/login', (req, res) => {

		login.add(databaseData, req, (err, data) => {

			res.setHeader('Access-Origin-Allow-Headers', ['Authorization'])
			res.setHeader('content-type', 'application/json')
			res.setHeader('accepts', 'POST')

			if (err) {
				if (err.login === false) {
					//un-authenticated username or password
					res.status(401)
					res.end(JSON.stringify({ message: 'wrong username or password' }))
				} else {
					//otherwise another type of error
					res.status(400)
					res.end('error:' + err)
				}

				return
			}
			//NO ERRORS
			res.status(201)
			res.end(JSON.stringify(data))
		})
	})

	//###########################################################\\
	//#						ADVERT ROUTES						#\\
	//###########################################################\\
	server.post('/api/v1.0/adverts', upload.single('photo'), (req, res) => {
		//console.log(req.file)

		if (!req.body['title']) {
			res.status(500)
			console.log('No title provided')
			res.end(JSON.stringify({ message: 'Please give your advert a title' }))
		}
		if (!req.body['category']) {
			res.status(500)
			console.log('No category provided')
			res.end(JSON.stringify({ message: 'Please assign your advert to a category' }))
		}
		if (!req.body['description']) {
			res.status(500)
			console.log('No description provided')
			res.end(JSON.stringify({ message: 'Please provide a description' }))
		}
		if (!req.body['ItemCondition']) {
			res.status(500)
			console.log('No Item Condition provided')
			res.end(JSON.stringify({ message: 'Please provide a Item Condition' }))
		}
		if (!req.body['city']) {
			res.status(500)
			console.log('No city provided')
			res.end(JSON.stringify({ message: 'Please provide a city' }))
		}
		if (req.file === undefined) {
			res.status(500)
			console.log('No photo uploaded')
			res.end(JSON.stringify({ message: 'Please upload photo' }))
		} else {

			const photoName = req.file.originalname
			const advertData = {
				author: req.body['author'],
				title: req.body['title'],
				category: req.body['category'],
				description: req.body['description'],
				ItemCondition: req.body['ItemCondition'],
				askingPrice: req.body['askingPrice'],
				city: req.body['city'],
				photo: 'http://localhost:8080/img/' + photoName
			}

			advert.uniqueTitleValidator(databaseData, advertData.title, (err) => {
				if (err) {
					res.status(400)
					res.end(err.toString())
					return
				} else {
					advert.add(databaseData, advertData, (err) => {

						res.setHeader('content-type', 'application/json')
						res.setHeader('accepts', 'GET, POST')

						if (err) {
							res.status(400)
							res.end('error:' + err)
							return
						}

						res.status(201)
						res.end(JSON.stringify({ message: 'advert added successfully' }))
					})
				}
			})
		}
	})

	server.get('/api/v1.0/adverts', (req, res) => {

		const advertData = {}

		advert.getAll(databaseData, advertData, (err, result) => {

			res.setHeader('content-type', 'application/json')
			res.setHeader('accepts', 'GET')

			if (err) {
				res.status(400)
				res.end('error:' + err)
				return
			}
			res.status(200)
			res.end(JSON.stringify(result))
		})
	})

	server.delete('/api/v1.0/adverts/:id', (req, res) => {

		const advertData = {
			id: req.params.id
		}

		advert.deleteById(databaseData, advertData, (err, result) => {

			if (err) {
				res.status(400)
				res.end('error:' + err)
				return
			}
			res.status(200)
			res.end(JSON.stringify(result))
		})

	})

	//###########################################################\\
	//#						MESSAGE ROUTES						#\\
	//###########################################################\\
	server.post('/api/v1.0/messages', (req, res) => {

		if (!req.body['subject']) {
			res.status(500)
			console.log('Message SUBJECT unknown')
			res.end(JSON.stringify({ message: 'Please choose a subject' }))
		}
		if (!req.body['message']) {
			res.status(500)
			console.log('Message unknown')
			res.end(JSON.stringify({ message: 'Please write your message first' }))
		} else {
			const messageData = {
				author: req.body['author'],
				recipient: req.body['recipient'],
				subject: req.body['subject'],
				message: req.body['message'],
				dateAndTime: new Date()
			}

			message.add(databaseData, messageData, (err, result) => {

				if (err) {
					res.status(400)
					res.end('error:' + err)
					return
				}

				res.status(201)
				res.end(JSON.stringify(result))
			})
		}
	})

	server.get('/api/v1.0/messages/:recipient', (req, res) => {

		const messageData = {
			recipient: req.params.recipient
		}

		message.getByRecipent(databaseData, messageData, (err, result) => {

			res.setHeader('content-type', 'application/json')
			res.setHeader('accepts', 'GET')

			if (err) {
				res.status(400)
				res.end('error:' + err)
				return
			}
			res.status(200)
			res.end(JSON.stringify(result))
		})
	})


	//###########################################################\\
	//#					 !!!ADMIN ROUTES!!!						#\\
	//###########################################################\\
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
