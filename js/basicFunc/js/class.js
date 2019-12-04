/* class相关 */

// todo class定义属性与方法的位置
class Point{
	value=1;
	sayName=()=>{
		console.log(this.value);
	};
	sayNamePrototype(){}
}

console.log(Point.prototype,Point);