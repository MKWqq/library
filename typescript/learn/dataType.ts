/**
 * 基本类型
 * number、string、boolean、null、undefined、any、enum、tuple、
 * Array【类型[]、Array<string | number>】
 * void、never
 * */
// todo 基本类型
let isDone: boolean = true;
let decLiteral: number = 2.3;
let userName: string = "wqq";
let sentence: string = `hello,my name is ${userName}`;
// todo array
let list1: (string | number)[] = ["1", 2, 3];
let list2: Array<number | string> = [2, 'w', 4]

// todo ReadonlyArray<T>——一旦被定义，值就不能被修改
let readonlyArray:ReadonlyArray<number | string>=[2,34,5]



// todo Tuple
/*已知数组数量和类型的数组  元祖Tuple*/
let list3: [boolean, number, string]
list3 = [true, 1, 'e']

// todo enum 举枚，下标对应值，可以通过值获取下标Choose.wqq，也可以通过下标获取值Choose[2]
enum Choose {wqq = 1, Mother = 2, Wife = 3}

function question(choose: Choose) {
    console.log('谁最美：')
    console.log('question', Choose[choose])
}

// question(2)

// todo any 不进行类型检测，可以是任意数据类型
let notSure: any = 2
notSure = 'ew'

// todo void 用于函数没有返回值
function warnUser(): void {
}

// todo null undefined
/* null undefined 默认情况下null和undefined是所有类型的子类型 */
let notNull: number = null
// let notNull:void=null
// let notNull:null=null

// 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
// let notNull:number=null——报错
// let notNull:void=null
// let notNull:null=null

// todo never never类型表示的是那些永不存在的值的类型。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// todo 类型断言——typescript不会进行类型检测，只是提示程序员的作用
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
// 或
// let strLength: number = (someValue as string).length;

// todo constance
class Person {
    name: string; // 名字
    age: number; // 年龄
    labels: Array<string>; // 标签组
    wives: string[]; // 妻子们
    contact: [string, number]; // 元组 联系[联系地址，联系电话]
    other: any; // 备注
    saveMonth: boolean = true; // 是否救落水的妈妈
    constructor() {
    }

    answer(): Choose {
        if (this.saveMonth === false) {
            return Choose.Wife;
        }
        return Choose.Mother;
    }

    hello(): void {
        console.log('hello~ i\'m ' + this.name);
        // return undefined;
        // return null;
    }

    empty() {
    }

    down(): never {
        while (true) {
        }
        // throw new Error('error')
    }
}
​
let zhangsan = new Person()
​
zhangsan.name = "张三";
zhangsan.age = 28;
zhangsan.labels = ["颜值逆天", "年轻多金"];
zhangsan.wives = ["一号", "二号", "三号"];
zhangsan.contact = ["北京xxxxxxx别墅", 2];
zhangsan.saveMonth = false;
zhangsan.other = '不好不坏的人'
​
let len = (<string>zhangsan.other).length
​
console.log(len)
question(zhangsan.answer())
​
zhangsan.hello()
​
console.log(zhangsan.empty());

// todo object
// 例1——定义属性名的类型
let _objNormal = <number | string>{};

// 例2——定义属性值类型
interface objectDes{
    name:string
}
let _objInter:objectDes={name:'12'};

