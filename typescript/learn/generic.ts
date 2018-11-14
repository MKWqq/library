/**
 * 泛型（generic）——传入类型与返回类型一致
 * */

// todo 类型变量<T>——T为any时，不能使用arg.length
// 例1：T为参数类型，不能直接使用arg.length
function identity1<T>(arg:T):T{
    let dataType=arg+'3';
    // console.log(dataType,dataType.length);
    return arg
}
identity1<object>({})
identity1<string>('ddd')

// 例2：T为数组类型中的数据变量——使用arg.length
function arrayIdentify1<T>(arg:T[]):T[]{
    // console.log(arg.length);
    return arg
}

function arrayIdentity2<T>(arg:Array<T>):Array<T>{
    return arg
}

// todo <T>泛型用于接口——调用时必须指定类型
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity2<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity2;

// todo <T>泛型类——调用时必须指定类型
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// todo 在泛型里使用类【class】类型
function create<T>(c: {new(): T; }): T {
    return new c();
}

// todo 在泛型约束中使用类型参数——extends keyof
function loggingIdetify<T,K extends keyof T>(obj:T,key:K):T{
    return obj;
}


// todo 泛型约束extends
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

// todo constance
class BeeKeeper{
    hasMask:boolean;
}
class ZooKeeper{
    nametag:string;
}
class Animal{
    numLegs:number;
}
class Bee extends Animal{
    keeper:BeeKeeper;
}
class Lion extends Animal{
    keeper:ZooKeeper;
}

// 使用函数类型检测
function createInstance<T>(c: new() => T):T{
    return new c();
}
/*
* 使用接口
* function createInstance<T>(c:{new():T;}):T{
    return new c();
}
* */

// createInstance(Lion).keeper.nametag;
// createInstance(Bee).keeper.hasMask;
