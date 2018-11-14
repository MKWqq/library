// todo vue响应式系统
/**
 * vue响应式系统
 * */
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function cb (val) {
    console.log("视图更新啦～", val);
}

/**
 * @params:val——使用闭包
 * */
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            cb(newVal);
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}

let o = new Vue({
    data: {
        test: "I am test.",
        name:'I am wqq'
    }
});
o._data.test = "hello,test.";
o._data.name = "hello,wqq.";

// todo Object.defineProperty(obj,key,descriptor)
/**
 * 自己测试Object.defineProperty(obj,key,descriptor)
 * */
let obj={
    d:'21'
}
test(obj,'d')
function test(obj,key){
    let val=''
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get(){
            return val
        },
        set(newVal){
            if(newVal===''){
                console.log('测试成功！');
                val=222
            }
        }
    })
}
console.log(obj.d);
obj.d=''
