const http = require('http')
const express = require('express')
const app = express()

require('dotenv').config({ path: '.env' })

app.get('/', function(req, res){
    res.end("Welcome to my Home Page")
})

const server = http.createServer(app)
server.listen(process.env.PORT)