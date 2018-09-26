/*
* Stream
* */
let http = require('http')
let path = require('path')
const fs = require('fs')
//TODO Readable
/*
* Readable
* */
let Readable = require('stream').Readable

let rs = Readable()
let c = 97 - 1
rs._read = function () {
  if (c >= 'z'.charCodeAt(0)) {
    return rs.push(null)
  }
  setTimeout(function () {
    rs.push(String.fromCharCode(++c))
  }, 200)
}
// rs.pipe(process.stdout)
process.on('exit', function () {
  console.error('\n_read() called ' + (c - 97) + ' times');
})
process.stdout.on('error', process.exit)

/*
* Readable
* */
process.stdin.on('readable', function () {
  var buf = process.stdin.read();
  console.log(buf);
});
//TODO Writable
/*
* Writable
* */
let Writable = require('stream').Writable
let ws = Writable()
ws._write = function (chunk, enc, next) {
  console.dir(chunk.toString())
  next()
}

// rs.pipe(ws)
/*
* Writable——write()
* */

// process.stdout.write('hello')

/*
* Writable——.end()
* */
// let fws = fs.createWriteStream('./test.js')
// fws.write("console.log('you success!')");
// setTimeout(function () {
//   fws.end(';')
// }, 200)
//TODO classic stream
/*
* Stream
* */
let Stream = require('stream')
let _stream = new Stream
_stream.readable = true
let cs = 64
let iv = setInterval(function () {
  if (++cs >= 75) {
    clearInterval(iv)
    _stream.emit('end')
  } else {
    _stream.emit('data', String.fromCharCode(cs))
  }
}, 500)
// _stream.pipe(process.stdout)

/*
* 'data' and 'end' listener
* */
// rs.on('data',function(data){
//   console.log(data);
// })
// rs.on('end',function(){
//   console.log('end');
// })
//TODO through
/*
* through
* */
// let through = require('through');
// rs.pipe(through(function (data) {
//   console.log(data);
// }, function () {
//   console.log('end')
// }))
//TODO concat-stream
/*
* concat-stream
* */
let concat=require('concat-stream')
let cs_1=concat((body)=>{
  // when .end() is called,this code can implement
  // console.log(body.toString())
})
// let cs_1_p=97
// let cs_1_t=setInterval(function(){
//   if(++cs_1_p>='z'.charCodeAt(0)){
//     clearInterval(cs_1_t)
//     cs_1.end(1);
//   }else{
//     // console.log(cs_1_p);
//     cs_1.write(String.fromCharCode(++cs_1_p))
//   }
// },100)


//TODO fs stream
/*
* fs readable stream and writable stream
* */
// let frs_1=fs.createReadStream('./testA.js')
// let fws_1=fs.createWriteStream('./test.js')
// frs_1.on('data',function(data){
//   console.log(data);
// })
// frs_1.on('end',function(){
//   console.log('end');
// })
// fws_1._write=function(chunk){
//   console.log(chunk.toString());
// }
// frs_1.pipe(fws_1)
// prompt('you want?','house')
const crypto = require('crypto');

const secret = 'we are family';
const hash = crypto.createHmac('sha256', secret)
  .update('I love cupcakes')
  .digest('hex');
// console.log(hash);
let _crypto=require('crypto')
let s='we are family'
let handleredData=_crypto.createHmac('sha256',s).digest('hex')
// console.log(handleredData);
// console.log(String.fromCharCode(97));

// const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', 'a password');
const encrypted =
  'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
// console.log(decrypted);

// todo module
/**
 * 1、当模块为一个文件夹，用require引入文件夹时，默认为引入index.js里的内容
 * */
let _module=require('./moduleDir')
// console.log(_module);

/**
 * 2、当require(dirName)参数仅仅为文件夹名字，索引规则是从当前文件所在父文件夹开始往上查找，找node_modules文件夹中找该文件夹，直到找到为值
 * */
// let _module=require('moduleDir')
// console.log(_module);

// todo promise
/**
 * .then(successHandler,errorHandler)中，errorHandler与.catch()区别
 * */
Promise.resolve(function(){
  console.log(1);
}).then(function(result){
  // console.log('promise result：',result);//——打印resole中的参数
  throw new Error('this is error message！')
}).catch(function(errMsg){
  // console.log(errMsg);//——打印出throw抛出的错误信息
})

Promise.resolve(function(){
  console.log(1);
}).then(function(result){
  // console.log('promise result：',result);//——打印resole中的参数
  // throw new Error('this is error message！')
},function(errMsg){
  // console.log('error');——不会打印
  // console.log(errMsg);//——不会打印出throw抛出的错误信息
})
// promise穿透
Promise.resolve('foo').then(null).then(function(result){
  console.log(result);
})







