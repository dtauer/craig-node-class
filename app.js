const http = require('http')
const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.end("Home Page")
})

const server = http.createServer(app)
server.listen(3000)