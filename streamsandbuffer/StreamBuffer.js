const http=require('http')
const mFileRetriever=require('fs')

const startServer=http.createServer((req,res)=>{
    console.log('server has started')
    var readText=mFileRetriever.createReadStream('./Demo.txt')
    readText.setEncoding('utf-8')
    res.writeHead(200, {'Content-Type': 'text/plain'});
    readText.on('error',(error)=>{
        console.log('Getting error while reading file')
        res.write(error.message);
    })

    readText.on('data',(data)=>{
        console.log('data')
        res.write(data);

    })

    readText.on('end',()=>{
        console.log('end file reading')
        return res.end();
    })
})
startServer.listen(7000)