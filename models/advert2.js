'use strict'

const db = require('../database')

exports.add = function(conData, advertData, callback){

    db.connect(conData, (err, conn) => {

		//when done check for error
		if (err) {
			console.log('error in connecting to db:' + err)
			callback(err)
			return
		}
        
        conn.query('INSERT INTO Adverts SET ?', advertData, (err, result) => {
			//return control to the calling module
			callback(err, result)
		})
	})


}
