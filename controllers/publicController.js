const Entry = require('../models/Entry')
const User = require('../models/User')

exports.showIndex = async function (req, res){
    // Get Entries from Database
    const entries = await Entry.find() // Select * from Entries Collection

    res.render('index', { entries })
}

exports.showNewEntry = function (req, res){
    res.render('new-entry')
}

exports.addNewEntry = function (req, res){
    if(!req.body.title || !req.body.body){
        res.status(400)
        res.end('Post data not found')
        return
    }
    /*req.entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    })*/

    const newEntry = new Entry({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    })
    newEntry.save()

    res.redirect('/')
}

exports.deleteEntry = async function(req, res){
    const entry = await Entry.findById(req.params.id)
    entry.remove()
    
    res.redirect('/')
}

exports.showCreateAccount = function(req, res){
    res.render('create-account')
}

exports.createAccount = async function(req, res){
    // TODO: MAKE THE USER's ACCOUNT
    const email = req.body.email
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm

    if( password != passwordConfirm){
        return res.redirect('/create-account')
    }

    // Check to see if user already exists
    const user = await User.findOne({ email })
    if(user){
        //user exists, just redirect for now
        return res.redirect('/create-account')
    }

    // assuming user doesn't exist, make user and take them to login page
    const newUser = new User({ email, password})
    await newUser.save()

    res.redirect('/login')
}

exports.showLogin = function(req, res){
    res.render('login')
}

exports.loginUser = function(req, res){
    res.redirect('/')
}

exports.logout = function(req, res){
    req.logout()
    res.redirect('/')
}