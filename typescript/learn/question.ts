/**
 * 代码总结
 * */

// todo (<type>_obj)['name']=true
// 有属性名类型：type只要包含设置属性名值类型即可，属性名类型由之前设置决定，如下例子
// 无属性名类型：属性名类型只能为type类型
let _obj = <number>{};
(<number | string>_obj)[1]=true;

