module.exports={
    // todo 时间正则
    /**
     * 判断日期类型是否为YYYY-MM-DD格式的类型
     * @param value
     * @returns {boolean}
     */
    isFormatDate: function (value) {
        if (value.length !== 0) {
            let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
            let r = value.match(reg)
            if (r === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
     * @param value
     * @returns {boolean}
     */
    isFullDate: function (value) {
        if (value.length !== 0) {
            let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
            let r = value.match(reg)
            if (r === null) {
                return false
            } else {
                return true
            }
        }
    },
    // todo 正则
    /**
     * 格式化手机号
     * @param mobile
     */
    getFormatMobile: function (mobile) {
        let formatMobile = mobile
        if (mobile && mobile.length >= 4) {
            formatMobile = mobile.substring(0, 3) + '****' + mobile.substring(mobile.length - 4, mobile.length)
        }
        return formatMobile
    },

    /**
     * 判断输入的字符是否为英文字母
     * @param value
     * @returns {boolean}
     */
    isLetter: function (value) {
        if (value.length !== 0) {
            let reg = /^[a-zA-Z]+$/
            if (!reg.test(value)) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 判断输入的字符是否为中文
     * @param value
     * @returns {boolean}
     */
    isChinese: function (value) {
        if (value.length !== 0) {
            let reg = /^[\u0391-\uFFE5]+$/
            if (reg.test(value)) {
                return true // 请将“字符串类型”要换成你要验证的那个属性名称！
            } else {
                return false
            }
        }
    },
    /**
     * 判断输入内容是否为空
     * @param value
     * @returns {boolean}
     */
    isNull: function (value) {
        if (value.length === 0) {
            return true
        } else {
            return false
        }
    },

    /**
     * 手机号格式判断
     * @param value
     * @returns {boolean}
     */
    isMobile: function (value) {
        if (value.length !== 0) {
            // let reg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/
            // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            let reg = /^1[34578]\d{9}$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 电话号格式
     * @param value
     * @returns {boolean}
     */
    isTelPhone: function (value) {
        if (value.length !== 0) {
            let reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 验证email格式
     * @param value
     * @returns {boolean}
     */
    isEmail: function (value) {
        if (value.length !== 0) {
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 验证身份证号（这里只做位数验证）
     * @param value
     * @returns {boolean}
     */
    isIDCardNo: function (value) {
        if (value.length !== 0) {
            let reg = /^\d{15}|\d{}18$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 验证银行卡号（这里只做位数验证）
     * @param value
     * @returns {boolean}
     */
    isBankCardNo: function (value) {
        if (value.length !== 0) {
            let reg = /^\d{15,19}$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 是否为数字
     * @param value
     * @returns {boolean}
     */
    isNumber: function (value) {
        if (value.length !== 0) {
            let reg = /^[0-9]*$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 验证有1-2位小数的正实数(小数可有可无，但最多2位小数)
     * @param value
     * @returns {boolean}
     */
    isDecimals2: function (value) {
        if (value.length !== 0) {
            let reg = /^\d+(?:\.\d{1,2})?$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },

    /**
     *正则正整数
     *
     */
    positiveInterger: function (value) {
        // let reg = /^[0-9]\d*$/
        let reg = /^(-)?[0-9][0-9]*$/ // 正负整数
        if (value) {
            if (reg.test(value)) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    },

    /**
     * 账号（正整数）
     */
    getFormatnum: function (value) {
        if (value.length !== 0) {
            let reg = /^[0-9]+$/
            let result = value.match(reg)
            if (result === null) {
                return false
            } else {
                return true
            }
        }
    },
}