'use strict'

const user = require('./models/user')
const db = require('./database')
const login = require('./models/loginTracking')
const advert = require('./models/advert')
const message = require('./models/message')
const dump = require('./dumpData');
//package for parsing files, in this case images.
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/img')
	},

	filename: function (req, file, callback) {
		callback(null, file.originalname)
	}
})

const upload = multer({ storage: storage })


/* eslint-disable no-magic-numbers */

//Function for all routes
exports.allRoutes = function (databaseData, server) {


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
			}
			else {
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
		if(req.file === undefined || !req.file){
			console.log('Please upload a file')
		}
		console.log(req.file)
		const advertData = {
			author: req.body['author'],
			title: req.body['title'],
			category: req.body['category'],
			description: req.body['description'],
			ItemCondition: req.body['ItemCondition'],
			askingPrice: req.body['askingPrice'],
			city: req.body['city'],
			photo: 'http://localhost:8080/img/' + req.file.originalname
		}

		advert.uniqueTitleValidator(databaseData, advertData.title, (err) => {
			if (err) {
				res.status(400)
				res.end(err.toString())
				return
			}
			else {
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
	})

	server.get('/api/v1.0/adverts', (req, res) => {

		let advertData = {}

		advert.getAll(databaseData, advertData, function (err, result) {

			res.setHeader('content-type', 'application/json')
			res.setHeader('accepts', 'GET')

			if (err) {
				res.status(400);
				res.end("error:" + err);
				return;
			}
			res.status(200);
			res.end(JSON.stringify(result));
		});
	})

	//###########################################################\\
	//#						MESSAGE ROUTES						#\\
	//###########################################################\\
	server.post('/api/v1.0/messages', (req, res) => {
        
        let messageData = {
			author: req.body['author'],
			recipient: req.body['recipient'],
			subject: req.body['subject'],
			message: req.body['message'], 
			dateAndTime: new Date()
		};
		
        
        message.add(databaseData, messageData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);	
            res.end(JSON.stringify(result));
        });
    })
	
	server.get('/api/v1.0/messages/:recipient', (req, res) => {

        let messageData = {
            recipient : req.params.recipient
        }

        message.getByRecipent(databaseData, messageData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
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

	server.post('/api/v1.0/admin/addDumpData', (req, res) => {


		//dump adverts data
		dump.addAdverts(databaseData);

		res.status(200);
		res.end("dump data were added successfully");
	});

}
