/* 函数式编程 */

// todo 科里化——公共方法固定公共参数
let add = function (x,y,z,o,p) {
	return x+y+z+o+p
}

function curryFunc(fn){
	if(Object.prototype.toString.call(fn)!=='[object Function]'){
		throw new Error('not function');
	}

	return function curried(...args){
		if(args.length<fn.length){
			return function(...arg){
				return curried.apply(null,args.concat(arg))
			}
		}
		return fn.apply(null,args);
	}
}

curryFunc(add)(1)(3)(4)(5)(6);

// todo 简易Promise
class MyPromise{
	constructor(executor) {
		this.value = null;
		typeof executor == 'function' && executor(this.resolve.bind(this), this.reject.bind(this));
	}

	then(success){
		const result = success(this.value);
		const mp = new MyPromise();
		mp.value = result;
		return mp;
	}

	resolve(value){
		this.value = value;
	}

	reject(err){
		this.err = err;
	}
}
// 构建一个 MyPromise 对象
const mp1 = new MyPromise((resolve, reject) => {
	resolve(10);
});

// 链式调用求值
mp1.then( r => {
	console.log('mp1 r => ', r);    // 结果: 10
	return r + 3;
} ).then( r => {
	console.log('mp2 r => ', r);    // 结果: 13
	return r + 5;
} ).then( r => {
	console.log('mp3 r => ', r);    // 结果: 18
} );
