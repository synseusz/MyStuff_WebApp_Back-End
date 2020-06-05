'use strict'

const db = require('./database')
const bcrypt = require('bcrypt')


/**
 * Add a new user to the database
 * @module addUser
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Array} userData - Stores email, password, registration date
 * @param  {Function} callback - Callback to controlling module
 */
exports.addUser = function(conData, userData, callback){

	//if pass validation connect to DB
	db.connect(conData, (err, conn) => {

		//when done check for error
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}

		//paswd encryption
		const saltRounds = 10
		userData.password = bcrypt.hashSync(userData.password, saltRounds)


		//###~ QUERY ~###
		conn.query('INSERT INTO users SET ?', userData, (err, result) => {
			if (err) {
				console.log('error in executing the query')
				callback(err)
				return
			}
			//return control to the calling module
			callback(err, result)
		})
	})
}
/**
 * Validates if email provided already exists in the database.
 * @module uniqueEmailValidator
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {String} email - Email given
 * @param  {Function} callback - Callback to controlling module
 */
exports.uniqueEmailValidator = (conData, email, callback) => {
	db.connect(conData, (err, conn) => {
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}
		conn.query('SELECT email FROM users', (err, result) => {
			let n
			if (err) {
				console.log('error in executing the query')
				callback(err)
				return
			}
			for(n=0; n<result.length; n++){
				if(result[n].email === email){
					err = new Error('User already exists in DB')
				}
			}
			callback(err, result)
		})
	})
}
