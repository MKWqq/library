/**
 * 你不知道的javascript 方法总结
 * */
/** 修改this绑定对象 */
function softBind(){
    if(!Function.prototype.softBind){
        Function.prototype.softBind=function(obj){
            var fn=this;
            var curried=[].slice.call(arguments,1);
            var bound=function(){
                return fn.apply((!this || this===(window || global)?obj:this),curried.concat.apply(curried,arguments))
            }
            bound.prototype=Object.create(fn.prototype);
            return bound;
        }
    }
}
/** 给对象增加@@iterator */
function objectIterator(obj){
    Object.defineProperty(obj,Symbol.iterator,{
        configurable:true,
        enumerable:false,
        writable:false,
        value:function(){
            // 对函数引用执行时的上下文——隐式绑定
            var o=this;
            var idx=0;
            var keyArr=Object.keys(o);
            return {
                next:function(){
                    return {
                        value:o[keyArr[idx++]],
                        done:idx>keyArr.length
                    }
                }
            }
        }
    });
}

/** 类构造函数继承 */
function inheritClass(){
    function Parent(name){
        this.name=name
    }
    Parent.prototype.sayName=function(){
        console.log(this.name)
    }
    function Child(name,age){
        // 混入
        Parent.call(this,name);
        this.age=age;
    }
    // 继承Parent原型对象方法，并且解耦，往Child.prototype加属性与方法不会影响Parent.prototype
    Child.prototype=Object.create(Parent.prototype);
}

/** 设置原型，._proto_ */
function redefineProto(){
    Object.defineProperty(Object.prototype,'__proto__',{
        get(){
            return Object.getPrototypeOf(this)
        },
        set(newProto){
            // Es6定义，一般不修改原型，因为涉及范围广，速度非常慢
            Object.setPrototypeOf(this,newProto);
            return newProto
        }
    });
}

export default{
    softBind,
    objectIterator,
    redefineProto
}


