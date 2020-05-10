var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    fs.writeFile('./simpleFile2', 'THis is second File',function(err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (err){
            console.log(err)
            res.write(err.message);
        }
        else {
            try{
                // this is another way to read file sync
                const data= fs.readFileSync('./simpleFile2','utf8')
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