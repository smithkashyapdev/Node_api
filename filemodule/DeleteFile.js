const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {
    fs.unlink('./simpleFile2', function(err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (err){
            console.log(err)
            res.write(err.message);
        }
        else {
            res.write("File has been deleted.");
        }

        return res.end();
    });
}).listen(7000);