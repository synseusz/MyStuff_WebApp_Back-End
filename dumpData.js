'use strict'

const blog = require('./models/blog');

//this package we need it to generate some random strings 
const randomstring = require('randomstring');


//----------------Add Random Blogs ----------------

let blogData = [];

let addBlog = function(conData, blogData){
    
    blog.add(conData, blogData, function (err, data){
    
        if(err){
            console.log("the following error occured:" + err);
            return;
        }
    });
};

exports.addBlogs = function(conData){

    for( let i = 0; i < 24; i++){

        let imgNum = (i % 9) + 1;
        let tempBlog = {
            title: randomParagraph(4, 8),
            authorId: Math.random() * (8 - 1) + 1,
            body: randomParagraph(100, 300),
            createdDate: new Date(),
            photo: 'http://localhost:8080/img/img' + imgNum + '.jpeg'
        };

        blogData.push(tempBlog);
    }
    
    blogData.forEach(async element => {

        addBlog(conData, element);
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