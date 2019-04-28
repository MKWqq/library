/**
 * 你不知道的javascript 练习册
 * */
// todo Object.create(null)
let newObjCreate=Object.create(null);
let newObj={};
newObj.toString();// 正常执行，toString方法继承Object原型链
// newObjCreate.toString();// 无原型委托，无Object原型链的方法
// todo 原型获取
let a={f:1}
let b=Object.create(a)
console.log(Object.getPrototypeOf(a).constructor,Object.getPrototypeOf(a).isPrototypeOf(b));

// todo Class原型链继承
function Test(){
    this.name=1
}
Test.prototype.say=function(){
    console.log(this.name);
}
let test=new Test();
console.log(Object.hasOwnProperty('say'));

// todo 修改prototype，直接赋值和用Object.create()赋值的区别
function InheritProto(){}
InheritProto.prototype.say1=function(){
    console.log(1);
}
function InstanceProto(){}

InstanceProto.prototype=Object.create(InheritProto.prototype);
InstanceProto.prototype.say2=function(){
    console.log(2);
}
let inheritProto=new InheritProto();
let instanceProto=new InstanceProto();
instanceProto.say1(); // 1，继承InheritProto原型链的say1方法
// inheritProto.say2() //报错，因为InheritProto原型链没有say2方法


