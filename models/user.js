'use strict'

const db = require('../database')
const bcrypt = require('bcrypt')

//this function is responsible for adding a new user
exports.add = function(conData, userData, callback){

	//if pass validation connect to DB
	db.connect(conData, (err, conn) => {

		//when done check for error
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}
		
		//paswd encryption
		userData.password = bcrypt.hashSync(userData.password, 10)


		//###~ QUERY ~###
		conn.query('INSERT INTO users SET ?', userData, (err, result) => {
			//return control to the calling module
			callback(err, result)
		})
	})
}

exports.uniqueValidator = (conData, email, callback) => {
	db.connect(conData, (err, conn) => {
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}
		conn.query('SELECT email FROM users', (err, result) => {
			let n
			for(n=0; n<result.length; n++){
				if(result[n].email === email){
					err = new Error('User already exists in DB')
				}
			}
			callback(err, result)
		})
	})
}
