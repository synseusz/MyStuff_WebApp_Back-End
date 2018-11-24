'use strict'

const db = require('../database');
const authentication = require('../authentication');

exports.add = function(conData, req, callback){
    
    authentication.userLogin(conData, req, (err, data) => {

        //if an error occured return to the calling module
        if (err) {
            callback(err);
            return;
        }	
        //otherwise we can now connect to the db to add the login activity by that user
        db.connect(conData, function(err, data){
		
            //when done check for any error
            if (err) {
                callback(err);
                return;
            }	
            
            let loginTrackData = {
                userId : data.id,
                dateAndTime: new Date()
            }
            //perform the query
            data.query('INSERT INTO logins SET ?', loginTrackData, function (err, result) {
                
                if (err) {
                    callback(err);
                    return;
                }	
                //return control to the calling module
                callback(err, result);
            });
        });

    });
	
};