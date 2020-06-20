var express = require('express')
var router = express.Router()

const AuthController = require("../controller/UserController");
myMiddleware = function (req, res, next) {
    //console.log('routerMiddleware-->'+req.body)
    next()
}




router.post('/signUp',AuthController.signUp)


module.exports = router