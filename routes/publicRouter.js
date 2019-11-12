const express = require('express')
const publicRouter = express.Router()
const publicController = require('../controllers/publicController')
const passport = require('passport')

//Home Page
publicRouter.route('/')
    .get(publicController.showIndex)

//Show New Entry Page
publicRouter.route('/new-entry')
    .get(publicController.showNewEntry)
    .post(publicController.addNewEntry)

// Remove an entry
publicRouter.route('/entry/:id/delete')
    .get(publicController.deleteEntry)

publicRouter.route('/create-account')
    .get(publicController.showCreateAccount)
    .post(publicController.createAccount)

publicRouter.route('/login')
    .get(publicController.showLogin)
    .post(passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    }))

publicRouter.route('/logout')
    .get(publicController.logout)

//Make the publicRouter Available for anything to use
module.exports = publicRouter