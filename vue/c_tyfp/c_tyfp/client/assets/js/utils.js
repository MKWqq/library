// 公共使用的方法

module.exports = {
  /**
   * 返回导入表头数据
   * @returns {*}
   */
  numToString: function (numm) {
    var stringArray = []
    var numToStringAction = function (nnum) {
      var num = nnum - 1
      var a = parseInt(num / 26)
      var b = num % 26
      stringArray.push(String.fromCharCode(64 + parseInt(b + 1)))
      if (a > 0) {
        numToStringAction(a)
      }
    }
    numToStringAction(numm)
    return stringArray.reverse().join("")
  },
  /**
   * 返回导入表头数据
   * @returns {*}
   */
  handleImportHeaderData: function (_data, title, key, isRequire) {
    let returnData = []
    _data.forEach(item => {
      returnData.push({title: item[title], key: item[key], isRequire: item[isRequire] === 'YES' ? 1 : 0})
    })
    return returnData
  },
  /**
   * 返回extra数据
   * @returns {*}
   */
  handleExtraData: function (_data, label, value) {
    let returnData = []
    _data.forEach(item => {
      returnData.push({label: item[label], value: item[value]})
    })
    return returnData
  },
  /**
   * 返回extra数据
   * @returns {*}
   */
  importPromptData: function (_data, label, value) {
    let returnData = []
    _data.forEach(item => {
      returnData.push(item[label])
    })
    return returnData.join('、')
  },
  /**
   * 返回table表extra数据
   * @returns {*}
   */
  tableExtraData: function (_data, label, value) {
    let returnData = []
    _data.forEach(item => {
      returnData.push({value:item[value],label:item[label]})
    })
    return returnData
  },
  /**
   * 获取回显树菜单id公共方法
   * @returns {*}
   */
  getTreeId: function (treeData = [], childFiled = 'childList') {
    let data = []
    treeFunc(treeData)

    function treeFunc(treeData, childFiled = 'childList') {
      treeData.forEach(treeItem => {
        if (treeItem[childFiled] && treeItem[childFiled].length > 0) {
          treeFunc(treeItem[childFiled])
        } else {
          data.push(treeItem['node_id'])
        }
      })
    }

    return data
  },
  /**
   * 获取当前月的第一天
   * @returns {*}
   */
  getCurrentMonthFirst: function () {
    let date = new Date()
    date.setDate(1)
    let dateStr = date.toISOString()
    return dateStr.split('T')[0]
  },
  /**
   * 获取当前月的最后一天
   * @returns {*}
   */
  getCurrentMonthLast: function () {
    let date = new Date()
    let currentMonth = date.getMonth()
    let nextMonth = ++currentMonth
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
    let lastDate = new Date(nextMonthFirstDay)
    let lastDateStr = lastDate.toISOString()
    return lastDateStr.split('T')[0]
  },
  /**
   * 获取当前月
   */
  getCurrentMonth: function () {
    return new Date().toISOString().substring(0, 7)
  },
  /**
   * 获取当前年
   */
  getCurrentYear: function () {
    return new Date().getFullYear().toString()
  },
  /**
   * 获取月份
   */
  getMonth: function (dateVal) {
    let date = new Date(dateVal)
    var currDate = date.getDate()
    var currMonth = date.getMonth() + 1
    var currYear = date.getFullYear()
    String(currMonth).length < 2 ? (currMonth = '0' + currMonth) : currMonth
    String(currDate).length < 2 ? (currDate = '0' + currDate) : currDate
    var formatDate = currYear + '-' + currMonth
    return formatDate
  },
  /**
   * 获取年份
   */
  getYear: function (date) {
    return date.getFullYear().toString()
  },
  /**
   * 获取指定格式日期yyyy-MM-dd
   * @param dateVal
   * @returns {string}
   */
  getFormatDate: function (dateVal) {
    let date = new Date(dateVal)
    var currDate = date.getDate()
    var currMonth = date.getMonth() + 1
    var currYear = date.getFullYear()
    String(currMonth).length < 2 ? (currMonth = '0' + currMonth) : currMonth
    String(currDate).length < 2 ? (currDate = '0' + currDate) : currDate
    var formatDate = currYear + '-' + currMonth + '-' + currDate
    return formatDate
  },
  /**
   * 获取指定格式日期yyyy-MM-dd HH:mm:ss
   * @param dateVal
   * @returns {string}
   */
  getFormatFullDate: function (dateVal) {
    let date = new Date(dateVal)
    let currDate = date.getDate()
    let currMonth = date.getMonth() + 1
    let currYear = date.getFullYear()
    let currHours = date.getHours()
    let currMunite = date.getMinutes()
    let currSeconds = date.getSeconds()
    String(currMonth).length < 2 ? (currMonth = '0' + currMonth) : currMonth
    String(currDate).length < 2 ? (currDate = '0' + currDate) : currDate
    String(currHours).length < 2 ? (currHours = '0' + currHours) : currHours
    String(currMunite).length < 2 ? (currMunite = '0' + currMunite) : currMunite
    String(currSeconds).length < 2 ? (currSeconds = '0' + currSeconds) : currSeconds
    var formatDate = currYear + '-' + currMonth + '-' + currDate + ' ' + currHours + ':' + currMunite + ':' + currSeconds
    return formatDate
  },
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
  /**
   * 手机号格式判断
   * @param value
   * @returns {boolean}
   */
  isMobile: function (value) {
    if (value.length !== 0) {
      // let reg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/
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
   * 中文字节
   */
  chineseLengthChange: function (str, len) {
    var len = 0;
    if (str) {
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        }
        else {
          len += 2;
        }
      }
    }
    return len;
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
  /**
   * 是否为正整数
   */
  // TODO 正整数
  getPositiveIteger: function (value) {
    if (value.length > 0) {
      let reg = /^[0-9]\d*$/
      if (value.match(reg)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  /**
   * 规则验证
   */
  ruleInspect: function (data, params, mySelf) {
    // data： 配备规则；params：提示文字的变量名(字符串类型)；mySelf：调用页面上Vue的实例
    // return 0表示不通过； 1表示通过
    const _this = this
    let myNum = []
    mySelf[params] = ''
    data.forEach((el, index, arr) => {
      if (isNaN(el.myRule)) {
        if (el.myRule === 'Required') {
          if (mySelf[el.myName].length) {
            myNum.push(1)
          } else {
            mySelf[params] = mySelf[params] + mySelf.$errCode[el.myCode] + '；'
            myNum.push(0)
          }
        } else {
          let err = el.myRule.test(mySelf[el.myName])
          if (!err) {
            mySelf[params] = mySelf[params] + mySelf.$errCode[el.myCode] + '；'
            myNum.push(0)
          } else {
            myNum.push(1)
          }
        }
      } else {
        let err = _this.chineseLengthChange(mySelf[el.myName]) > el.myRule
        if (err) {
          mySelf[params] = mySelf[params] + mySelf.$errCode[el.myCode] + '；'
          myNum.push(0)
        } else {
          myNum.push(1)
        }
      }
    })
    for (let i = 0; i < myNum.length; i++) {
      if (myNum[i] === 0) {
        return 0
      }
    }
    return 1
  }
}
