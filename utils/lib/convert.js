/**
 * 数据类型转换
 * */
module.exports = {
    toString: function (val) {
        return val == null
            ? ''
            : typeof val === 'object'
                ? JSON.stringify(val, null, 2)
                : String(val)
    }
}
