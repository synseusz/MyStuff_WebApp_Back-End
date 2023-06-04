'use strict'
//import express module
const express = require('express')
//import cors to enable cors
const cors = require('cors')
//import body parser
const bodyParser = require('body-parser')

const routes = require('./routes')

//const https = require('https');
const fs = require('fs');

//create the express module
const server = express()

const options = {
	key: fs.readFileSync(process.env.SSL_KEY),
	cert: fs.readFileSync(process.env.SSL_CERT)
};
const sslServer = https.createServer(options, server);

//To parse json data
server.use(bodyParser.json())

//enable all origins
server.use(cors())

//enable cors for more complex routes
server.options('*', cors())

//allow static files to serve the images
server.use(express.static('public'))

//prepare our database connection parameters
const databaseData = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWD,
	database: process.env.DATABASE
}

//save server port on global variable
const port = process.env.PORT || 8080

//----- add all routes to the api end points ------
routes.allRoutes(databaseData, server)

//start the server
sslServer.listen(port, err => {
	if (err) {
		console.error(err);
	} else {
		console.log(`App is ready on port ${port}`);
	}
});

