var mocha=require('../code/mocha');
var should = require('should');
/**
 * 基础用法
 * */
var assert = require('assert');

describe.only('Test Describe',function(){
    before(function(){
        console.log('before');
    });
    after(function(){
        console.log('after');
    });
    // beforeEach(function(){
    //     console.log('beforeEach1');
    // });
    // afterEach(function(){
    //     console.log('afterEach1');
    // });
    describe.skip('skip describe TEST',function(){
        it('test cell1',function(){
        });
        it('test cell2',function(){
            should.ok(true);
        });
    });
});
describe.only('Array', function() {
    before(function(){
        console.log('beforeParent',mocha.global);
        this.skip();
    });
    after(function(){
        console.log('afterParent');
    });
    describe('#indexOf()', function() {
        before(function(){
            console.log('before');
        });
        after(function(){
            console.log('after');
        });
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
describe('return Promise or calling done()',function(){
    it('return promise',function(){
        return new Promise((resolve,reject)=>{
            resolve(true)
        }).then(()=>{
            should.ok(true,'数据为假数据')
        })
    });
    it('test hooks',function(){
        should.ok(true,'data is true')
    });
});

