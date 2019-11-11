const express = require('express')
const publicRouter = express.Router()
const publicController = require('../controllers/publicController')

//Home Page
publicRouter.route('/')
    .get(publicController.showIndex)

//Show New Entry Page
publicRouter.route('/new-entry')
    .get(publicController.showNewEntry)
    .post(publicController.addNewEntry)

//Make the publicRouter Available for anything to use
module.exports = publicRouter