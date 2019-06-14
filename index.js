// import modules 
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

// import controller functions
const createPostController = require('./controllers/createPost')
const homeController = require('./controllers/home')
const savePostController = require('./controllers/savePost')
const contactController = require('./controllers/contactController')
const aboutPageController = require('./controllers/aboutPage')
const viewPostController = require('./controllers/viewPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

// create new instance of express as app
const app = new express()

// create database connection
mongoose.connect('mongodb://localhost/node-js-blog',  { useNewUrlParser: true })

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

mongoose.set('useCreateIndex', true);
const Post = require('./database/models/post')

// import custom middleware 
const validateSavePost = require('./middleware/savePost');
const auth = require('./middleware/auth')

// use imported modules in the app
app.use(express.static('public'))
app.use(expressEdge)
app.use(fileUpload())

// use body parser module and allow for formatting of data 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// set views folder as the source of the edge templates 
app.set('views', `${__dirname}/views`)

// ***** Routes *****
app.get('/', homeController);
app.get('/auth/register', createUserController);
app.get('/auth/login', loginController);
app.get('/post/new', auth, createPostController);
app.post('/post/store', auth, validateSavePost, savePostController);
app.get('/about', aboutPageController);
app.get('/contact', contactController);
app.get('/post/:id', viewPostController);
app.post('/users/register', storeUserController);
app.post('/users/login', loginUserController);


app.listen(4000, () => {
    console.log('App listening on port 4000')
})