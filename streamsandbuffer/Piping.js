const http=require('http')
const mFileRetriever=require('fs')

const startServer=http.createServer((req,res)=>{
    console.log('server has started')
    var readText=mFileRetriever.createReadStream('./Demo.txt')
    var writeText=mFileRetriever.createWriteStream('./Demo2.txt')

    readText.pipe(writeText)
    writeText.on('finish',()=>{
        console.log('finish')
        readText.setEncoding('utf-8')
        res.writeHead(200, {'Content-Type': 'text/plain'});
        try {
            const read=mFileRetriever.readFileSync('./Demo2.txt')
            res.write(read);
        }
        catch (e) {
            res.write(e.message);
        }

        writeText.on('close',()=>{
            console.log('close')
            return res.end();
        })

    })



    writeText.on('pipe',()=>{
        console.log('pipe')
    })

    writeText.on('drain',()=>{
        console.log('drain')
    })


})
startServer.listen(7000)