var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    fs.appendFile('./simpleFile1', 'THis is append File',function(err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (err){
            console.log(err)
            res.write(err.message);
        }
        else {
            try{
                // this is another way to read file sync
                const data= fs.readFileSync('./simpleFile1','utf8')
                res.write(data);
            }
            catch (e) {
                console.log(e)
                res.write(e.message);
            }
        }

        return res.end();
    });
}).listen(7000);