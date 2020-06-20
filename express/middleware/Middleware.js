
 myMiddleware = function (req, res, next) {
     req.requestTime = Date.now()
     console.log(JSON.stringify(req.headers))
     var token = req.headers['token'];
     console.log('LOGGED ${token}'+token)
    next()
}



module.exports=myMiddleware