'use strict'
//import mysql
const mysql = require('mysql')

/**
 * Connect to the database
 * @module connect
 * @param  {Array} conData - Data needed to connect with DB such as host, user, password and database
 * @param  {Function} callback - Callback to controlling module
 */

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

/**
 * Create tables in the database
 * @module createTables
 * @param  {Array} conData - Data needed to connect with DB
 * @param  {Function} callback - Callback to controlling module
 * @param  {String} sql - SQL querry
 */

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
	sql += 'CREATE TABLE IF NOT EXISTS Adverts (id INT NOT NULL AUTO_INCREMENT, author VARCHAR(100), title VARCHAR(200), category VARCHAR(100), description LONGTEXT, ItemCondition VARCHAR(100), askingPrice INT, city VARCHAR(30), photo VARCHAR(2048), PRIMARY KEY (id));'
	sql += 'CREATE TABLE IF NOT EXISTS Messages (id INT NOT NULL AUTO_INCREMENT, author VARCHAR(200), recipient VARCHAR(200), subject VARCHAR(200), message VARCHAR(2048), dateAndTime DATETIME, PRIMARY KEY (id));'

	con.query(sql, (err, result) => {
		callback(err, result)
	})

}
