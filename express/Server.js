const express=require('express')
const fsWatcher=require('fs')
const app=express()
const productAPI=require('./product/prod')
const bookAPI=require('./book/bookmanager')
const envVariable=require('dotenv')
const loginMiddleware=require('./middleware/Middleware')
const userCredential=require('./login/userCredentialAPI')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mongoose = require("mongoose");
// create application/json parser
// create application/x-www-form-urlencoded parser
envVariable.config()
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@node-rest-apis.k5rqp.mongodb.net/test',{ useNewUrlParser: true } )

const db = mongoose.connection;

db.on("error", error => console.log("server--->"+error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());
app.use(urlencodedParser);
app.use(loginMiddleware)

app.get('', function (req, res) {
    res.send('Hello World!')
})



app.post('/', function (req, res) {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Cannot ' + req.method + ' ' + req.url);

})

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

//Getting File Text

app.get('/TestFile.txt', function (req, res) {
    console.log(req.url)
    try{
        const data=fsWatcher.readFileSync('./'+req.url)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(data)
    }
    catch (e) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.send(e.message)
    }

})

app.get('/ab?cd', function (req, res) {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('ab?cd')

})

app.get('/users/:userId/books/:bookId', function (req, res) {
    console.log(req)
    res.send(req.params)
})

app.get('/flights/:From-:To', function (req, res) {
    console.log(req)
    res.send(req.params)
})

app.use('/product/prod', productAPI)
app.use('/user',userCredential)

var customMiddleware = function (req, res, next) {
    req.requestTime = Date.now()
    console.log('customMiddleware')
    next()
}

app.use('/book', customMiddleware,bookAPI)

app.listen(7000)