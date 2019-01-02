'use strict'
const db = require('../database');

exports.add = function(conData, messageData, callback){
	
	db.connect(conData, function(err, conn){

		//error check
		if (err) {
			callback(err);
			return;
		}	
		
		//QUERY
		conn.query('INSERT INTO messages SET ?', messageData, function (err, result) {
			callback(err, result);
		});
	});
};

exports.getByRecipent = function(conData, messageData, callback){
	
	db.connect(conData, function(err, conn){
		
		if (err) {
			callback(err);
			return;
		}	
		
		//QUERY
		conn.query('SELECT * FROM messages WHERE recipient = ?', messageData.recipient, function (err, result) {
			callback(err, result);
		});	
			
	});
};