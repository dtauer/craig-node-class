exports.showIndex = function (req, res){
    res.render('index')
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
    req.entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    })

    res.redirect('/')
}