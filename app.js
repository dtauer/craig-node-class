const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const passportHelper = require('./helpers/passport')


const app = express()
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true })

passportHelper() // calling the passport helper module to initialize

const publicRouter = require('./routes/publicRouter')


//Define the static files folder (for images, styles, javascript etc)
const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))

// Tell express how to render our views and where to find them
app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

// Wireup the cookie and session management for logged in users
app.use(cookieParser())
app.use(session({
    secret: 'abc123',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res, next){
    res.locals.currentUser = req.user // create a currentUser property for the views to work with
    next()
})

// Wire up the router
app.use('/', publicRouter)

app.use(function(req,res){
    res.status(404)
    res.render("404")
})



const server = http.createServer(app)
server.listen(process.env.PORT)