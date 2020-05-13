
setImmediate(()=>{
    console.log("Once all code will compile then immediate code will execute.")
})

setTimeout(()=>{
 console.log('immediate Console')
})

setTimeout(()=>{
    console.log('Console after 1 second')
},1000)

const executeData=()=>{
    console.log("execute Data Loop...")

}

const intervalLoop=setInterval(executeData)

setTimeout(()=>{
    console.log("stop recursive loop")
    clearInterval(intervalLoop)
},500)

console.log("endLine-----")