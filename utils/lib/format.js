module.exports={
    // todo 金额
    /**
     * 输入验证金额——整数部分1-10位，小数部分不超过2位
     * */
    keyUpRegexFunc :function (value, regexName, lenValue = 64) {
        if (value) {
            if (regexName) {
                if (regexName === 'positiveInterger') {
                    value = value.replace(/[^\d\.]/, '')
                    value = value.replace(/^0/g, "")
                    value = value.length > Number(lenValue) ? value.substr(0, Number(lenValue)) : value
                    return value
                }
                else if (regexName === 'isDecimals') {
                    value = String(value)
                    value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
                    value = value.replace(/^\./g, ""); //保证第一个字符是数字，如果第一个为小输掉则删除
                    // value = value.replace(/^0/g, ""); //保证第一个字符不是0，如果是0则删除
                    value = /^(\d{1,10})$/.test(value.split('.')[0]) ? value : value.substr(0, 10)
                    value = value.replace(/\.{2,}/g, "."); //只保留连续小数点的第一个, 清除多余的
                    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");//只保留所有小数点的第一个，清除其他的
                    value = value.replace(/^(\d+)\.(\d\d).*$/g, '$1.$2'); //保证最多两位小数
                    // value = value.length > Number(lenValue) ? value.substr(0, Number(lenValue)) : value
                    return value
                }
                else if (regexName === 'lengthRegex') {
                    let len = 0;
                    let str = value
                    for (let i = 0; i < str.length; i++) {
                        let c = str.charCodeAt(i);
                        //单字节加1
                        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                            len++;
                        }
                        else {
                            len += 2;
                        }
                        if (len > Number(lenValue)) {
                            return value.substring(0, i)
                        }
                    }
                    return value
                }
            }
            else {
                return value
            }
        } else {
            return ''
        }
    },

    /**
     * 金额格式转换——千分号，两位小数
     * 返回金额格式
     */
    moneyFormat : function (str) {
        str = String(str)
        var regex = /\B(?=(\d{3})+(?!\d))/g;
        // var regex = /(\d)(?=(\d\d\d)+(?!\d))/g;
        // var regex = /(\d)(?=(?:\d{3})+$)/g;
        // console.log('1233456.5632'.replace(/(\d{1,3})(?=(?:\d{3})+\.)/g, '$1,'));
        let returnStr

        if (str.indexOf(".") == -1) {

            returnStr = str.replace(regex, ',') + '.00';

        } else {
            var newStr = str.split('.');
            returnStr = newStr[0].replace(regex, ',');

            if (newStr[1].length === 0) {
                //小数点后没有数字
                returnStr = returnStr + '.' + '00';
            } else if (newStr[1].length === 1) {
                //小数点后只有一位时
                returnStr = returnStr + '.' + newStr[1] + '0';
            } else if (newStr[1].length > 1) {
                //小数点后两位以上时
                var decimals = newStr[1].substr(0, 2);
                returnStr = returnStr + '.' + decimals;
            }
        }
        return returnStr
    },
    /**
     * 限制金额格式（onkeyup、onchange、onafterpaste三个事件同时使用最佳）
     * @param obj
     */
    limitAmountFormat: function (obj) {
        let evt = (evt) ? evt : window.event
        if (evt.keyCode) {
            if (evt.keyCode === 8) {      // keycode 46 = BackSpace
                return
            }
        }
        obj.value = obj.value.replace(/[^\d.]/g, '')                                    // 清除"数字"和"."以外的字符
        obj.value = obj.value.replace(/^\./g, '')                                       // 验证第一个字符是数字
        obj.value = obj.value.replace(/\.{2,}/g, '.')                                   // 只保留第一个, 清除多余的
        obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')              // 只能输入两个小数

        if (isNaN(obj.value)) {
            obj.value = ''
        }
    }
}