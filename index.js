// import modules 
require ('dotenv').config();
const express = require('express')
const edge = require('edge.js')
const path = require('path')
const bodyParser = require('body-parser')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

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
const logOutController = require('./controllers/logoutUser')
const loginUserController = require('./controllers/loginUser')
const redirectIfAutheticated = require('./middleware/redirectIfAuthenticated')

// create new instance of express as app
const app = new express()

// create database connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true
});
const PORT = process.env.PORT;

app.use(connectFlash());

cloudinary.config({
    api_key: process.env.CLOUDINARY_NAME,
    api_secret: CLOUDINARY_API_SECRET,
    cloud_name: CLOUDINARY_API_KEY
})

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
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

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
})

// ***** Routes *****
app.get('/', homeController);
app.get('/auth/register', redirectIfAutheticated, createUserController);
app.get('/auth/login', redirectIfAutheticated, loginController);
app.get('/post/new', auth, createPostController);
app.get('/auth/logout', auth, logOutController)
app.post('/post/store', auth, validateSavePost, savePostController);
app.get('/about', aboutPageController);
app.get('/contact', contactController);
app.get('/post/:id', viewPostController);
app.post('/users/register', redirectIfAutheticated, storeUserController);
app.post('/users/login', redirectIfAutheticated, loginUserController);
app.use((req, res) => {
    res.render('not-found')
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});