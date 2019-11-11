const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()

const publicRouter = require('./routes/publicRouter')

require('dotenv').config({ path: '.env' })

//Define the static files folder (for images, styles, javascript etc)
const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))

// Tell express how to render our views and where to find them
app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false}))

var entries = []
app.locals.entries = entries

app.use(function(req, res, next){
    req.entries = entries
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