// import modules 
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')


// create new instance of express as app
const app = new express()

// create database connection
mongoose.connect('mongodb://localhost/node-js-blog',  { useNewUrlParser: true })
const Post = require('./database/models/post')

// use imported modules in the app
app.use(express.static('public'))
app.use(expressEdge)

// use body parser module and allow for formatting of data 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// set views folder as the source of the edge templates 
app.set('views', `${__dirname}/views`)

// ***** Routes *****
app.get('/', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

app.get('/post/new', (req, res) => {
    res.render('create')
})

app.post('/post/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        console.log(error, post)
        res.redirect('/')
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    console.log(req.params)
    res.render('post', {
        post
    })
})

app.listen(4000, () => {
    console.log('App listening on port 4000')
})