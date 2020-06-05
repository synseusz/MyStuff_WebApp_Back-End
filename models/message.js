'use strict'
const db = require('./database')

/**
 * Add a new message to the database
 * @module addMessage
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Array} messageData - Stores author, recipient, subject, message, date
 * @param  {Function} callback - Callback to controlling module
 */

exports.addMessage = function(conData, messageData, callback){

	db.connect(conData, (err, conn) => {

		//error check
		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('INSERT INTO messages SET ?', messageData, (err, result) => {
			if (err) {
				console.log('error in executing the query')
				callback(err)
				return
			}
			callback(err, result)
		})
	})
}

/**
 * Get message from DB by specified recipient
 * @module getMessageByRecipient
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Array} messageData - Stores recipient value from req.params
 * @param  {Function} callback - Callback to controlling module
 */

exports.getMessageByRecipient = function(conData, messageData, callback){

	db.connect(conData, (err, conn) => {

		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('SELECT * FROM messages WHERE recipient = ?', messageData.recipient, (err, result) => {
			if (err) {
				console.log('error in executing the query')
				callback(err)
				return
			}
			callback(err, result)
		})

	})
}
