// 检测数据类型，及代码是否可用等
/**
 * author:qing qing wang
 * timer:2018-9-12
 * */
module.exports={
    // todo 检测Native Code
    /**
     * isNative(Symbol)
     * */
    isNative: function (Ctor) {
        return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    },

    // todo 获取值的原始类型字符串 Object.prototype.toString.call()——返回"[object String]"
    /**
     * Get the raw type string of a value e.g. [object Object]
     * Object.prototype.toString.call()——返回"[object String]"
     * @return 返回String/Object/Number等数据类型字符串
     * */
    toRawType:function(value){
        return Object.prototype.toString.call(value).slice(8,-1)
    },

    // todo 检测是否为数组
    /**
     * 判断是否为数组
     * */
    isArrayFun: function (arg) {
        let arrString = Object.prototype.toString.call([])
        if (Object.prototype.toString.call(arg) === arrString) {
            return true
        } else {
            return false
        }
    },

    // todo 检测是否为对象
    isObjectFunc:function(arg){
        return Object.prototype.toString.call(arg)==='[object Object]'
    },

    // todo 检测是否为RegExp
    isRegExpFunc:function(arg){
        return Object.prototype.toString.call(arg)==='[object RegExp]'
    }
}