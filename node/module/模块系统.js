/**
 * Node模块系统①②③④⑤⑥⑦⑧⑨⑩
 * 学习网站：https://blog.csdn.net/u012422829/article/details/52760981
 * 1、模块分为核心模块、第三方模块、自定义模块。
 *  1.1、核心模块：定义在 Node.js 源代码的 lib/ 目录下，如require('http')
 *
 * 注意：1、require() 总是会优先加载核心模块，例如require('http') 始终返回内置的 HTTP 模块，即使有同名文件。
 * 2、require加载模块规则：
 * 　假设Y是路径，X是文件名或目录名，当 Nodejs 遇到 require(Y+X) 时，按照下面的顺序处理：

 　　1、如果 X 是核心模块（例如：require("http")）

     　　a.返回该模块

     　　b.不再继续执行

 　　2、如果Y是以“./”、“/”或“../”开头

     　　a.把X当成文件，从指定路径开始，依次查找下面文件：X、X.js、X.json、X.node，只要其中一个存在，就返回该文件，不再继续执行

     　　b.把X当成目录，从指定路径开始，依次查找下面文件：X/package.json(main字段)、X/index.js、X/index.json、X/index.node，只要其中一个存在，就返回该文件，不再继续执行

 　　3.如果 X 不是核心模块，也没有以“./”、“/”或“../”开头，则Nodejs会从当前模块的父目录开始，尝试从它的 /node_module 目录里加载模块，如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录

 　　4.抛出“not found”
 * */

// todo require()加载模块规则
/**
 * 1、当模块为一个文件夹，用require引入文件夹时，默认为引入index.js里的内容
 * */
let _module=require('./moduleDir')
console.log(_module);

/**
 * 2、当require(dirName)参数仅仅为文件夹名字，索引规则是从当前文件所在父文件夹开始往上查找，找node_module文件夹中找该文件夹，直到找到为值
 * */
// let _module=require('moduleDir')
// console.log(_module);



