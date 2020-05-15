var express = require('express')
var router = express.Router()

router
    .get('/',(req, res)=> {
        res.send('Get a random book')
    })
    .post('/', (req, res) => {
        res.send('Add a book')
    })
    .put('/',(req, res) => {
        res.send('Update the book')
    })

module.exports = router