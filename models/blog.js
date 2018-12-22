'use strict'
var db = require('../database');

exports.add = function(conData, blogData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//TODO: server validation
		
		//perform the query
		conn.query('INSERT INTO blogs SET ?', blogData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};


exports.getAll = function(conData, blogData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
				
		//perform the query
		conn.query('SELECT * FROM blogs', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});	
			
	});
};
