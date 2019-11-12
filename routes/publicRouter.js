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

// Remove an entry
publicRouter.route('/entry/:id/delete')
    .get(publicController.deleteEntry)

//Make the publicRouter Available for anything to use
module.exports = publicRouter