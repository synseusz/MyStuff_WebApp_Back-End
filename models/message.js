'use strict'
const db = require('../database')

exports.add = function(conData, messageData, callback){

	db.connect(conData, (err, conn) => {

		//error check
		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('INSERT INTO messages SET ?', messageData, (err, result) => {
			callback(err, result)
		})
	})
}

exports.getByRecipent = function(conData, messageData, callback){

	db.connect(conData, (err, conn) => {

		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('SELECT * FROM messages WHERE recipient = ?', messageData.recipient, (err, result) => {
			callback(err, result)
		})

	})
}
