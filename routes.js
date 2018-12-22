'use strict'
//import user model
const user = require('./models/user')
//import database model with all database operations
const db = require('./database')
//import loginTracking model with login auth
const login = require('./models/loginTracking')
const advert = require('./models/advert')
const blog = require('./models/blog');
const dump = require('./dumpData');


/* eslint-disable no-magic-numbers */

//Function for all routes
exports.allRoutes = function (databaseData, server) {

	//------------blogs Routes-----------------
    server.post('/api/v1.0/blogs', (req, res) => {
        
        let blogData = {
			title: req.body['title'],
			authorId: req.body['authorId'],
			body: req.body['body'],
			createdDate: new Date(),
			photo: req.body['photo'] 
        };
        
        blog.add(databaseData, blogData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });
    })
	server.get('/api/v1.0/blogs', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let blogData = {

        }
        blog.getAll(databaseData, blogData, function (err, result){
        
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

	//~~User Routes~~
	server.post('/api/v1.0/users', (req, res) => {

		//ectract data from request
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
			}
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
	server.post('/api/v1.0/admin/addDumpData', (req, res) => {


        //dump some users and blogs data
        dump.addBlogs(databaseData);

        res.status(200);
        res.end("dump data were added successfully");
        
    });

	// Advert route
	server.post('/api/v1.0/adverts', (req, res) => {

		const advertData = {
			title: req.body['title'],
			category: req.body['category'],
			description: req.body['description'],
			ItemCondition: req.body['ItemCondition'],
			askingPrice: req.body['askingPrice'],
			city: req.body['city'],
			photo: req.body['photo']
		}

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
	})
}
