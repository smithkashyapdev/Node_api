var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    fs.readFile('./simpleFile1', 'utf8',function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (err){
            console.log(err)
        }
        else {
            console.log(data)
            res.write(data);
        }


        return res.end();
    });
}).listen(7000);