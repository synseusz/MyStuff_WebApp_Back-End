'use strict'

const db = require('./database');
const auth = require('basic-auth')

exports.userLogin = (conData, request, callback) => {
	
	//first check if basic authorization is present
	if (!request.headers.authorization || request.headers.authorization.indexOf('Basic') === -1){
		//throw new Error('authorization header missing')
		let err = {message:'authorization header missing'};
		console.log("Error:" + err.message);
		callback(err);
		return;
	}
		
	const userData = auth(request);

	//if no userData
	if (!userData){
		//throw new Error('missing email and/or password')
		let err = {message:'missing username and/or password'};
		console.log("Error:" + err.message);
		callback(err);
		return;
	}
	
	//connect to the database to check if such email and passwd exists
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db")
			callback(err);
			return;
		}	
		
		//####~Query~#####
		data.query('SELECT id FROM users WHERE email="' + userData.name + '" AND password="' + userData.pass + '"', function (err, result) {
			
			if(err){
				console.log("error in executing the query")
				callback(err);
				return;
			}
			
			//return control to the calling module
			//return null for error with data indicating successful login
			//return an error data with login false
			if(result && result.length > 0)
				callback(null, {userId:1234, login:true});
			else
				callback({login:false});
		});
	});
}