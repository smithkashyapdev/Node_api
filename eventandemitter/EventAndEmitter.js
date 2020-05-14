const events=require('events')
const eventEmitter=new events.EventEmitter()

const EMITTER_TAG_1='EMITTER_TAG_1'
const EMITTER_TAG_2='EMITTER_TAG_2'

const myHandler1=()=>{
    console.log('Hello My Handler 1')
}

const myHandler2=()=>{
    console.log('Hello My Handler 2')
}


eventEmitter.on(EMITTER_TAG_1,myHandler1)

eventEmitter.on(EMITTER_TAG_2,myHandler2)

eventEmitter.emit(EMITTER_TAG_2)
eventEmitter.emit(EMITTER_TAG_1)