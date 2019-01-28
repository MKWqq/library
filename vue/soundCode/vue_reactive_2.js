// todo vue依赖收集追踪原理
/**
 * vue依赖收集追踪原理
 * @description：每一个vue实例，都建一个Watcher实例，每一个Watcher实例都有当前的update方法
 * 全局Dep实例【一个属性对应一个Dep实例，一个Dep实例对应相应的Watcher】，当vue实例中用了该值，就会在Dep实例中加入当前watcher，当set函数中的值更新，就调用Dep实例中的所有Watcher实例的update更新所有Vue视图
 * */
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

class Dep {
    constructor () {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }

    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }

    /* 通知所有Watcher对象更新视图 */
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
class Watcher {
    constructor () {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update () {
        console.log("视图更新啦～");
    }
}

Dep.target = null;
function defineReactive (obj, key, val) {
    /* 一个Dep类对象 */
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target);
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        observer(this._data);
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test);
    }
}
let o=new Vue({
    data:{
        test:'I am test.',
        name:'3232'
    }
})
o._data.name = "hello,test.";

