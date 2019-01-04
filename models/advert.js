'use strict'
const db = require('../database')

exports.add = function(conData, advertData, callback){

	db.connect(conData, (err, conn) => {

		//error check
		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('INSERT INTO adverts SET ?', advertData, (err, result) => {
			callback(err, result)
		})
	})
}

exports.uniqueTitleValidator = (conData, title, callback) => {
	db.connect(conData, (err, conn) => {
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}
		conn.query('SELECT title FROM adverts', (err, result) => {
			let n
			for(n=0; n<result.length; n++){
				if(result[n].title === title){
					err = new Error('Advert with such title already exists in DB, try to pick another one')
				}
			}
			callback(err, result)
		})
	})
}

exports.getAll = function(conData, advertData, callback){

	db.connect(conData, (err, conn) => {

		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('SELECT * FROM adverts', (err, result) => {
			callback(err, result)
		})

	})
}
exports.deleteById = function(conData, advertData, callback){

	db.connect(conData, (err, conn) => {

		if (err) {
			callback(err)
			return
		}

		//QUERY
		conn.query('DELETE FROM adverts WHERE id = ?', advertData.id, (err, result) => {
			callback(err, result)
		})

	})
}
