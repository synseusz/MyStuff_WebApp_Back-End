'use strict'

const advert = require('./models/advert');

//this package we need it to generate some random strings 
const randomstring = require('randomstring');


//----------------Add Random Adverts ----------------

let advertData = [];

let addAdvert = function(conData, advertData){
    
    advert.add(conData, advertData, function (err, data){
    
        if(err){
            console.log("the following error occured:" + err);
            return;
        }
    });
};

exports.addAdverts = function(conData){

    for( let i = 0; i < 24; i++){

        let imgNum = (i % 9) + 1;
        //let tempAdvert = {
            //title: randomParagraph(4, 8),
            //authorId: Math.random() * (8 - 1) + 1,
            //body: randomParagraph(100, 300),
            //createdDate: new Date(),
            //photo: 'http://localhost:8080/img/img' + imgNum + '.jpeg'
        //};
        let tempAdvert = {
            title: randomParagraph(4, 8),
			category: "testCategory",
			description: randomParagraph(100, 300),
			ItemCondition: "testCondition",
			askingPrice: 1234,
			city: randomParagraph(4, 8),
			photo: 'http://localhost:8080/img/img' + imgNum + '.jpeg'
        }

        advertData.push(tempAdvert);
    }
    
    advertData.forEach(async element => {

        addAdvert(conData, element);
    });
};

//generate a random pagraph length between min and max words
var randomParagraph = function (min, max){

    let paragraph = "";
    
    let paragraphLength =  Math.random() * (max - min) + min
    for(let i = 0; i < paragraphLength; i++){

        paragraph += randomWord(3, 7) + " ";

    }

    return paragraph;
};

//generate random word of length berween min and max
var randomWord = function(min, max){

    let wordLength = Math.random() * (max - min) + min;

    return randomstring.generate(wordLength);
};