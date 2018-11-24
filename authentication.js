'use strict'
// we will need our database module
const db = require('./database');

exports.userLogin = (conData, request, callback) => {
	
	//first I will check if I ve got basic authorization
	if (request.authorization === undefined || request.authorization.basic === undefined){
		//throw new Error('authorization header missing')
		let err = {message:'authorization header missing'};
		console.log("Error:" + err.message);
		callback(err);
		return;
	}
		
	const auth = request.authorization.basic

	//extracting username and password from the auth
	if (auth.username === undefined || auth.password === undefined){
		//throw new Error('missing username and/or password')
		let err = {message:'missing username and/or password'};
		console.log("Error:" + err.message);
		callback(err);
		return;
	}
	
	//connecting to the database
	db.connect(conData, function(err, data){
		
		//Checking if there are any errors
		if (err) {
			console.log("error in connecting to db")
			callback(err);
			return;
		}	
		
		//###~ QUERY ~###
		data.query('SELECT id FROM users WHERE username="' + auth.username + '" AND password="' + auth.password + '"', function (err, result) {
			
			if(err){
				console.log("error in executing the query")
				callback(err);
				return;
			}
			
			//return control to the calling module
			//return null for error with data indicating successful login
			//return an error data with login false and null for data
            if(result && result.length > 0)
				callback(null, {userId:result.id, login:true});
            else
                console.log("Account doesn't exist")
				callback({login:false});
		});
	});
}