/**
 * mocha+chai
 * */
var assert = require('chai').assert;

function add() {
    return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
        return prev + curr;
    }, 0);
}

describe('add()', function() {
    var tests = [
        {args: [1, 2], expected: 3},
        {args: [1, 2, 3], expected: 6},
        {args: [1, 2, 3, 4], expected: 10}
    ];

    tests.forEach(function(test) {
        it('correctly adds ' + test.args.length + ' args', function() {
            var res = add.apply(null, test.args);
            assert.equal(res, test.expected);
        });
        it('');
    });
});
describe('a suite of tests', function() {
    // this.timeout(0);

    it('should take less than 500ms', function(done) {
        // this.timeout(3000);
        setTimeout(done, 300);
    });

    it('should take less than 500ms as well', function(done) {
        setTimeout(done, 200);
    });
});
