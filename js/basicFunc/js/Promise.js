/* Promise模拟——Promise用于使得开发人员能够在指定地方、指定时间（三种状态）执行某些代码 */
/* 1、将promise执行情况主导权交由开发人员（Promise传入fn，由promise执行fn、将改变状态的方法抛出，promise状态改变交由开发人员）
2、由开发人员决定后续操作执行时间、执行操作类型（promise状态，pending、resolve、reject情况）
3、在开发人员决定执行类型后，执行指定代码（由用户决定，即promise实例传入fn） */

class Promise {
	constructor(fn) {
		this.zt='pending';
		this.successFn=null;
		this.errorFn=null;
		this.successData=null;
		this.errorData=null;
		this.timer=null;
		if(typeof fn ==='function'){
			try{
				fn.call(null,this.resolve.bind(this),this.reject.bind(this));
			}
			catch(err){
				this.reject(err);
			}
		}
		else{
			throw Error('not a function');
		}
	}
	resolve(data){
		this.zt='resolved';
		this.successData=data;
	}
	reject(err){
		this.zt='rejected';
		this.errorData=err;
	}
	then(successFn,errorFn){
		if(errorFn&&typeof errorFn==='function')this.errorFn=errorFn;
		this.successFn=successFn;
		this.checkZTFun();
	}
	catch(errorFn){
		this.errorFn=errorFn;
		this.checkZTFun();
	}
	checkZTFun(){
		if(this.timer) return;
		this.timer=setInterval(()=>{
			if(this.zt==='resolved'){
				this.successFn.call(null,this.successData);
				clearInterval(this.timer);
			}else if(this.zt==='rejected'){
				this.errorFn.call(null,this.errorData);
				clearInterval(this.timer);
			}else{
				//going
				return false;
			}
		},1000);
	}
}