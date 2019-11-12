const Entry = require('../models/Entry')

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
