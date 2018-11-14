/**
 * 接口与类
 * */

/**
 * todo interface
 * interfaced定义接口，用于array、object、class
 * */
// todo interface 描述可选、必填、只读要求
/* 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型 */
interface labelValue{
    /*必选属性*/
    name:string,
    /*可选属性?*/
    test?:number,
    /*只读属性*/
    readonly age:number
}
function printLabel(labelObj:labelValue):void{
    // labelObj.age=23——报错
    console.log(labelObj.name,labelObj.test)
}
printLabel({test:12,name:'wqq',age:24})

// todo ReadonlyArray<T>——一旦被定义，值就不能被修改
let readonlyArray:ReadonlyArray<number | string>=[2,34,5]

// todo interface描述函数类型——接口中没有方法名
interface searchFunc{
    (source: string, subString: string):boolean
}
let mySearch :searchFunc
mySearch=function(){
    return true
}

// todo interface描述对象中的方法——接口中有方法名
/* 例1 */
interface objFuncInter{
    funcName(source: string, subString: string):boolean
}
let obj:objFuncInter={
    funcName(){
        return true
    }
}

/* 例2 */
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    // 对象中含createCardPicker方法，createCardPicker的返回值为function，并满足() => Card检测类型，function中返回值满足Card类型检测
    createCardPicker(this: Deck): () => Card;
}

// todo interface描述可索引的类型 [index:number]:string——索引签名【string or number】+索引返回值类型【可为多个】
interface stringArray{
    readonly [index:string]:string | number
}
let myArray1:stringArray={'0':1}

interface NumberDictionary {
    [index: string]: number | string;
    length: number;    // 可以，length是number类型
    name: string       // `name`的类型与索引类型返回值的类型进行匹配
}
let myArray2:NumberDictionary={
    "name":'1',
    length:2
}

// todo interface 类类型——implements
// interface定义接口，class中使用implements实现接口，类的类型检测遵循interface接口中的规则
interface ClockInterfaceSimple {
    currentTime: Date,
    setTime(d:Date):string
}

class Clock implements ClockInterfaceSimple {
    currentTime: Date;
    constructor(h: number, g: number){}
    setTime(d){
        return d.getFullYear()
    }
}

// todo interface类静态部分与实例部分
/* constructor是属于类的静态部分，当一个类实现了一个接口时，只对其实例部分进行类型检查。不会检测类的静态方法 */
interface ClockConstructor {
    // 对constructor传参类型检测
    new (hour: number, minute: number): ClockInterface
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// todo 接口继承
interface Shape{
    color:string
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape,PenStroke{
    sideLength:number
}
let square=<Square>{};
square.color = "blue";
square.sideLength = 10;

// todo class定义数据类型 private、protected、public
// private修饰的变量在继承子类中不可用，在实例中也不可以用；而protected修饰的变量在继承子类可用，但在实例中不可用
class Person {
    static staticString:string;
    protected name: string;
    private namePrivate:string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello,my private name is my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(Person.staticString);
console.log(howard.getElevatorPitch());
// console.log(howard.name);//报错

// todo abstract
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

// todo 高级用法
// constance1
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }
//
// let greeter: Greeter;
// greeter = new Greeter("world");
// console.log(greeter.greet());

// constance2
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());

// todo 将类型当成接口使用
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};

