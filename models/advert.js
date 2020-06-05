'use strict'
const db = require('./database')

/**
 * Add a new advert to the database
 * @module addAdvert
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Array} advertData - Stores author, title, category, item condition, price, city, description and photo
 * @param  {Function} callback - Callback to controlling module
 */

exports.addAdvert = function(conData, advertData, callback){

	db.connect(conData, (err, conn) => {

		//error check
		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('INSERT INTO adverts SET ?', advertData, (err, result) => {
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
 * Validates if advert title provided already exists in the database
 * @module uniqueTitleValidator
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {String} title - Title given by user
 * @param  {Function} callback - Callback to controlling module
 */

exports.uniqueTitleValidator = (conData, title, callback) => {
	db.connect(conData, (err, conn) => {
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}
		conn.query('SELECT title FROM adverts', (err, result) => {
			let n
			if (err) {
				console.log('error in executing the query')
				callback(err)
				return
			}
			for(n=0; n<result.length; n++){
				if(result[n].title === title){
					err = new Error('Advert with such title already exists in DB, try to pick another one')
				}
			}
			callback(err, result)
		})
	})
}

/**
 * Get all adverts from the database
 * @module getAllAdverts
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Array} advertData - Stores author, title, category, item condition, price, city, description and photo retrieved from the database
 * @param  {Function} callback - Callback to controlling module
 */

exports.getAllAdverts = function(conData, advertData, callback){

	db.connect(conData, (err, conn) => {

		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('SELECT * FROM adverts', (err, result) => {
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
 * Delete advert by id
 * @module deleteAdvertById
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Array} advertData - Contains id from req.params
 * @param  {Function} callback - Callback to controlling module
 */

exports.deleteAdvertById = function(conData, advertData, callback){

	db.connect(conData, (err, conn) => {

		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('DELETE FROM adverts WHERE id = ?', advertData.id, (err, result) => {
			if (err) {
				console.log('error in executing the query')
				callback(err)
				return
			}
			callback(err, result)
		})

	})
}
