const mongoose = require('mongoose')

const Post = require('./database/models/post')


mongoose.connect('mongodb://localhost/node-js-test-blog')

// Post.findByIdAndUpdate('5cd333fb307ac15378fe33bd', {title: 'This first text'}, (error, post) => {
//     console.log(error, post)
// })

// Post.find({}, (error, posts) => {
//     console.log(error, posts)
// })

Post.findOneAndDelete({}, )

// Post.create({
//     title: 'My second blog post',
//     description: 'Second Blog post description',
//     content: 'Lorem ipsum content'
// }, (error, post) => {
//     console.log(error, post)
// })