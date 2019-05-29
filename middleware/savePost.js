module.exports = (req, res, next) => {
    if (req.files === null) {
        return res.redirect('/post/new')
    }
    next()
}