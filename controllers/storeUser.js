const User = require('../database/models/user')

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.log(error)
            return res.send(error.message)     
        }
        res.redirect('/')
    })
}