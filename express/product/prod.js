var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the Product page route
router.get('/', function (req, res) {
    res.send('Product page')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About Product')
})

module.exports = router