'use strict'
//advert.add function test
const advert = require('../models/advert')
const connData = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'database'
}
const advertData = {
	author: 'author',
	title: 'title',
	category: 'category',
	description: 'description',
	ItemCondition: 'ItemCondition',
	askingPrice: '1234',
	city: 'city',
	photo: 'http://localhost:8080/img/logo.svg'
}


test('adding a new advert', (done) => {
	advert.add(connData, advertData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
//advert.getAll test
test('get all adverts from db', (done) => {
	advert.getAll(connData, advertData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
const advertData2={}
test('get all adverts from db', (done) => {
	advert.getAll(connData, advertData2, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)

//advert.deleteById test
const advertData3 ={
	id: '123'
}
test('delete advert by id', (done) => {
	advert.deleteById(connData, advertData3, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
