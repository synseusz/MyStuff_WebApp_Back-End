'use strict'
//import mysql
const mysql = require('mysql')

exports.connect = function(conData, callback){

	const conn = mysql.createConnection({
		  host: conData.host,
		  user: conData.user,
		  password: conData.password,
		  database: conData.database
	})
	conn.connect((err) => {
		if (err) callback(err)
		callback(null, conn)
	})
}

exports.createTables = function(conData, callback){

	const con = mysql.createConnection({
		  multipleStatements: true,
		  host: conData.host,
		  user: conData.user,
		  password: conData.password,
		  database: conData.database
	})

	let sql = 'CREATE TABLE IF NOT EXISTS Users (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(32),'
	sql += 'password VARCHAR(100), registrationDate DATETIME, PRIMARY KEY (id));'

	sql += 'CREATE TABLE IF NOT EXISTS LoginTrack (id INT NOT NULL AUTO_INCREMENT, userId INT, dateAndTime DATETIME, PRIMARY KEY (id) );'



	con.query(sql, (err, result) => {
		console.log('finish query:' + result)
		callback(err, result)
	})

}
