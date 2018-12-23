'use strict'
const db = require('../database');

exports.add = function(conData, advertData, callback){
	
	db.connect(conData, function(err, conn){

		//error check
		if (err) {
			callback(err);
			return;
		}	
		
		//QUERY
		conn.query('INSERT INTO adverts SET ?', advertData, function (err, result) {
			callback(err, result);
		});
	});
};


exports.getAll = function(conData, advertData, callback){
	
	db.connect(conData, function(err, conn){
		
		if (err) {
			callback(err);
			return;
		}	
		
		//QUERY
		conn.query('SELECT * FROM adverts', function (err, result) {
			callback(err, result);
		});	
			
	});
};
