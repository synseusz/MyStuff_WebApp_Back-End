'use strict'
//advert.addAdvert function test
const advert = require('../models/advert')
const connData = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'database'
}
const advertData = {
	author: 'test@test.pl',
	title: 'title',
	category: 'category',
	description: 'description',
	ItemCondition: 'ItemCondition',
	askingPrice: '1234',
	city: 'city',
	photo: 'http://localhost:8080/img/huawei.jpg'
}


test('adding a new advert', (done) => {
	advert.addAdvert(connData, advertData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
//advert.getAllAdverts test
test('get all adverts from db', (done) => {
	advert.getAllAdverts(connData, advertData, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
const advertData2={}
test('get all adverts from db', (done) => {
	advert.getAllAdverts(connData, advertData2, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)

//advert.deleteAdvertById test
const advertData3 ={
	id: '123'
}
test('delete advert by id', (done) => {
	advert.deleteAdvertById(connData, advertData3, (err) => {
		expect(err).toBeNull()
		done()
	})
}
)
