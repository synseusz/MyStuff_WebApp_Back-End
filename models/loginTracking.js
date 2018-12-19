'use strict'

const db = require('../database')
const authentication = require('../authentication')

exports.add = function(conData, req, callback){

	authentication.userLogin(conData, req, (err, data) => {

		//if an error occured return to the calling module
		if (err) {
			callback(err)
			return
		}
		//otherwise we can now connect to the db
		db.connect(conData, (err, conn) => {

			//when done check for any error
			if (err) {
				callback(err)
				return
			}

			const loginTrackData = {
				userId: data.userId,
				dateAndTime: new Date()
			}
			//perform the query to add loginTrackData
			conn.query('INSERT INTO logintrack SET ?', loginTrackData, (err, result) => {

				if (err) {
					callback(err)
					return
				}
				//return control to the calling module
				callback(err, result)
			})
		})

	})

}
