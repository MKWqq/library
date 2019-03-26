/**
 * description:should学习用例
 * author：sweet wang
 * date：2019-01-22
 * */
var should = require('should');
/* 基本：
1、.an, .of, .a, .and, .be, .been, .has, .have, .with, .is, .which, .the, .it无特殊意义
 */
describe('should基本应用', function () {
    it('first constant', function () {
        (5).should.be.exactly(5).and.be.a.Number();
    });
});
// todo global Assertion（alias(from,to)、add、addChain）
should.use(function (should, Assertion) {
    // 1、Assertion.alias创建别名，此处可以用prop达到property的效果
    Assertion.alias('property', 'prop');
    /* 2、Assertion.addChain(name,[callback])，增加如同be类似无意义的链式断言 */
    Assertion.addChain('whether', function () {
        // console.log('whether链式被使用咯');
    });
    /* 3、Assertion.add()——this.params={operator:'描述',expected:'期望值',actual:'实际值'} */
    Assertion.add('idTest', function () {
        this.params = {operator: 'this is new assert'};
        // this.obj为调用should方法传入的参数
        this.obj.should.have.prop('id').which.is.a.Number();
        this.obj.should.have.prop('path');
    });
});
describe('Assertion.add方法使用：', function () {
    it('idTest and whether链式测试：', function () {
        should({id: 10, path: ''}).be.whether.idTest();
    });
});

// todo assertion Assertion实例
var a = new should.Assertion(42);

a.params = {
    operator: 'to be magic number'
};

a.assert(true);
// ok
should(1).be.ok();
// containDeep 顺序不重要
[1, 2, [1, 2, 3]].should.containDeep([1, [3, 1]]);
// containDeepOrdered 数组顺序要一样；对象，含属性名和值即可
[1, 2, [1, 2, 3]].should.containDeepOrdered([1, [2, 3]]);
({f: 2, a: 10, b: {c: 10, d: [1, 2, 3]}}).should.containDeepOrdered({b: {d: [1, 3]}, f: 2});
// containEql
'abc'.should.containEql('bc');
// eql===eqls===deepEqual
NaN.should.be.deepEqual(NaN);
({a: 10}).should.be.eql({a: 10})
    ['a'].should.not.be.eql({'0': 'a'});

// exactly===equal 使用全等【检测所有结构】
'0'.should.be.exactly('0');
// equalOneOf 使用全等【只检测值】
'10'.should.be.equalOneOf('a', '10', 'ab');
(1).should.be.oneOf(['a', 10, 1, 'ab', {a: 10}]);
// match
'foobar'.should.match(/^foo/);
({a: 'foo', c: 'barfoo'}).should.match(/foo$/);
(5).should.not.match(function (n) {
    return n < 0;
});
({a: 10, b: 'abc', c: {d: 10}, d: 0}).should
    .match({
        a: 10, b: /c$/, c: function (it) {
            return it.should.have.property('d', 10);
        }
});

// matchAny
[ 'a', 'b', ')'].should.matchAny(/\w+/);
// matchEach
[ 'a', 'b', 'c'].should.matchEach(/\w+/);
// Infinity
(10).should.not.be.Infinity();
(10).should.be.above(0);
(10).should.be.aboveOrEqual(10);
(11).should.be.approximately(10, 3);
(10).should.not.be.a.Promise()
it('is async', () => {
    return new Promise(resolve => resolve(10))
        .should.be.finally.eql(10);
});
({a:1,b:2,length:2}).should.have.length(2);
({ a: 10 }).should.have.property('a',10);
({ a: {b: 10}}).should.have.propertyByPath('a', 'b').eql(10);
({a:1,b:2}).should.have.size(2);



