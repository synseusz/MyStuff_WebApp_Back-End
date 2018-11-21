'use strict'
//import mysql
const mysql = require('mysql')

//export a function to open a connection to the database, we will need
//to always open a connection before we do any database operation or execute any query
//this function recieve the database access information and a callback function
//eventually the callback function will either be called with errors if any happened or
//be called and the connection object is passed to it with null for error
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

//export a function to create database tables
//this function suppose to create all our tables for us, we will need to call it only one time
//that is when we are setting up our final system, also note that this function should only be accessed
//by the administrator of the website, so it is very credential, currently we do not have

exports.createTables = function(conData, callback){

	const con = mysql.createConnection({
		  multipleStatements: true,
		  host: conData.host,
		  user: conData.user,
		  password: conData.password,
		  database: conData.database
	})

	let sql = 'CREATE TABLE Users (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(32),'
	sql += 'password VARCHAR(16), registrationDate DATETIME, PRIMARY KEY (id));'

	con.query(sql, (err, result) => {
		console.log('finish query:' + result)
		callback(err, result)
	})

}
