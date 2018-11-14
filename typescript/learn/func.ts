/**
 * typescript中function应用
 * */

//todo 函数类型推导——不使用接口，返回类型=>【例1：用于匿名函数】 let add:(x:number,y?:number)=>number=function(){}
// 注意：函数类型推导只是推导变量类型，不会在意对应变量名，如上的x和y
let add1:(x:number,y?:number)=>number=function(...rest:Array<any>):number{
    if(rest[1]){
        return rest[0]+rest[1]
    }else{
        return rest[0]
    }
}

// todo 函数类型推导——使用接口，返回类型:【例2：用于具名函数】
interface addInter{
    (x:number,y:number):number,
}
let add2:addInter=function (x,y){
    return x+y
}

// todo 函数类型推导【例3】
function add3(x:number,y:number):number{
    return x+y
}

// todo 函数参数
function params1(x:number=1,...rest):void{
    console.log(x);
}

function params2(x:number,y?:number):void{}

// todo this参数——指定this类型。添加this参数作为函数的第一个参数，并指定类型。
/**
 * 1、this:void，表示该函数不需要this对象，并注释掉this的调用
 * 2、this:类型 表示该函数只能被该类型调用 */
// function checkThis1(this:void,e:Event){}

// todo 例1：this:类型
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
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

// todo 例2 this:void
interface UIElement {
    addClickListener(onclick: (this: void, e: Error) => void): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: Error) {
        this.info = e.message;
    }
    onClickGood(this: void, e: Error) {
        console.log('点击了！');
    }
}
let h = new Handler();
let uiElement: UIElement = {
    addClickListener(onclick: (this: void, e: Error) => void) {
        // do something
    }
};

uiElement.addClickListener(h.onClickGood);

