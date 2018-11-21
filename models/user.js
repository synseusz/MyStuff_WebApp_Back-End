'use strict'

const db = require('../database')

//this function is responsible for adding a new user
exports.add = function(conData, userData, callback){

	//TODO: server validation

	//if pass validation connect to DB
	db.connect(conData, (err, conn) => {

		//when done check for any error
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}

		//TODO server validation


		//perform the query
		conn.query('INSERT INTO users SET ?', userData, (err, result) => {
			//return control to the calling module
			callback(err, result)
		})
	})
}
