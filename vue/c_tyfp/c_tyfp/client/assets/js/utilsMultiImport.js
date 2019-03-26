/**
 * @params returnData返回对象，
 *        currentNode当前对象
 *        currentNodeId当前对象 模板——node_id 导入——zx_id
 * */
function handlerMoneyCommon(returnData, currentNode, currentNodeId) {
  if (currentNode['je_lx'] === 'QJ') {
    let _pointIndex = currentNode['je_input'].toString().lastIndexOf('.')
    if ((_pointIndex > 0 && _pointIndex === (currentNode['je_input'].length - 1)) || !Number(currentNode['je_input'])) {
      // 小数点为最后一位或0.0，不改变输入值
      let jeNum = currentNode['je_input'].split('.')[0]
      if (jeNum) {
        jeNum = Number(jeNum.toString().replace(/,/g, ''))
        // 输入框有值
        returnData.totalMoney += Number(jeNum)
        returnData.zx_info.push({je: Number(jeNum), qd_id: currentNodeId, zx_mc: currentNode['name_str']})
      } else if (returnData.isReview) {
        // 将结算按钮禁用
        returnData.isReview = !returnData.isReview
      }
    } else {
      if (currentNode['je_input']) {
        currentNode['je_input'] = Number(currentNode['je_input'].toString().replace(/,/g, ''))
        // 输入框有值
        returnData.totalMoney += Number(currentNode['je_input'])
        returnData.zx_info.push({
          je: Number(currentNode['je_input']),
          qd_id: currentNodeId,
          zx_mc: currentNode['name_str']
        })
      } else if (returnData.isReview) {
        // 将结算按钮禁用
        returnData.isReview = !returnData.isReview
      }
    }
  } else {
    returnData.totalMoney += Number(currentNode['je'])
    returnData.zx_info.push({je: Number(currentNode['je']), qd_id: currentNodeId, zx_mc: currentNode['name_str']})
  }
}

/**
 * treeData的含第一级父级的数据
 * */
function treeISBTFunc(row, parentNode, treeData) {
  // is_bx==='YES' 设置选中和禁用
  if (row.is_bx === 'YES') {
    // 判断为单选还是复选——单选设置父级isChecked为当前选中值
    if (!parentNode && treeData.jd_sx === 'RADIO') {
      // 一级单选框
      treeData.isChecked = row['node_id']
    } else if (parentNode && parentNode.jd_sx === 'RADIO') {
      // 二级为单选框
      parentNode.isChecked = row['node_id']
    } else {
      // 该项为复选框
      row.isChecked = true
    }
    row.isDisabled = true
    return parentNode
  } else {
    return false
  }
}

/**
 * 请求url处理
 * */
export const handlerUrlFormat = function (url = '', cid = '', schoolCode = '') {
  return url + '?schoolCode=' + schoolCode + '&cid=' + cid
}

/**
 * checkbox判断当前的isChecked来判断是否选中
 * radio判断父级isChecked的值是子级的node_id来判断是否选中
 * is_bx 需要选中并且禁用，计算总金额
 * hasBXOption——是否有必填项
 * */
export const handlerTreeData = function (treeData) {
  let hasBXOption = false;
  if (treeData['jd_sx'] === 'RADIO') {
    treeData['isChecked'] = false
    treeData['node_id'] = 'root'
  }
  if (Array.isArray(treeData.subs)) {
    let _level = 0;//级别
    let returnObj = {returnData: treeData, totalMoney: 0}

    let recursionFun=function(recursionData, parentLevel, parentNode) {
      recursionData.forEach((row) => {
        let je_object = {}
        if (parentLevel === undefined || parentLevel === '' || parentLevel === null) {
          // 为一级
          _level = 0
        } else {
          _level = parentLevel + 1
        }

        // 金额为区间
        if (row['je_lx'] === 'QJ') {
          // je_object = {je_input: ''}
          je_object = {je_input: row['je']}
        }
        // 含子级
        if (row['child'] && Array.isArray(row['child']) && row['child'].length > 0) {
          row = Object.assign(row, je_object, {
            _level: _level,
            isChecked: false,
            isDisabled: true
          })

          // 判断is_bx
          hasBXOption = treeISBTFunc(row, parentNode, treeData, hasBXOption)

          recursionFun(row['child'], _level, row)
        } else {
          if (!row.child) {
            // 无child字段
            row = Object.assign(row, je_object, {
              _level: _level,
              isChecked: false,
              isDisabled: false,
              child: []
            })
          } else {
            row = Object.assign(row, je_object, {
              _level: _level,
              isChecked: false,
              isDisabled: false
            })
          }
          // 判断is_bx
          hasBXOption = treeISBTFunc(row, parentNode, treeData, hasBXOption)
        }
      })
    }

    recursionFun(treeData.subs);

    if (hasBXOption && treeData['jd_sx'] === 'RADIO' && !treeData['isChecked']) {
      //一级为radio，禁用含必选项以外的选择框
      isDisabledFunc(treeData,hasBXOption)
    }
    return returnObj
  }
  else {
    return {returnData: [], totalMoney: 0}
  }
}

/**
 * 遍历，一级为radio，禁用含必选项以外的选择框
 * @params hasBXOption为选中parentNode
 * */
function isDisabledFunc(treeData,hasBXOption) {
  // let _flag=null;
  function recursionFun(recursionData, parentNode) {
    recursionData.forEach((row) => {

      // 含子级
      if (row['child'] && Array.isArray(row['child']) && row['child'].length > 0) {
        recursionFun(row['child'], row)

      } else {
        if (parentNode && parentNode.jd_sx === 'RADIO' && hasBXOption===parentNode.isChecked) {
          // 该项为单选项并被选中
          // _flag=parentNode
        }else if(parentNode && parentNode.jd_sx === 'CHECKBOX' && row.isChecked) {
          // 该项为单选项并被选中
          // _flag=parentNode
        }

        if(hasBXOption && JSON.stringify(hasBXOption)!==JSON.stringify(parentNode)){
          row.isDisabled=true;
        }

      }
    })
  }

  recursionFun(treeData.subs);
}

/**
 * 模板调用
 * 只有一级为RADIO时才会调用此方法
 * 清除不同父级，一级为radio的选中，并返回总金额
 * node_id当前选中的父级的node_id
 * @return isReview结算按钮是否禁用，totalMoney选中总金额，treeData为处理后的tree
 * */
export const getTotalMoneyMore = function (treeData, node_id) {
  let returnData = {totalMoney: 0, treeData: treeData, isReview: true, zx_info: []}
  let flag
  if (Array.isArray(treeData.subs)) {
    let recursionFun=function (recursionData, parentNode) {
      recursionData.forEach(row => {
        // 需要清除除当前选中的其他选项 treeData.jd_sx一定为RADIO
        if (node_id === treeData.node_id) {

          // 当前选中为一级  计算金额总和
          if (treeData['isChecked'] === row['node_id']) {
            handlerMoneyCommon(returnData, row, row['node_id'])
          }

          // 清除除一级选中外的其他选中
          if (parentNode === undefined || parentNode === '' || parentNode === null) {
            row.isChecked = ''
          } else {
            row.isChecked = false
          }
        }
        else {
          // 当前选中为二级
          if (parentNode === undefined || parentNode === '' || parentNode === null) {
            // 当前为一级
            treeData.isChecked = false
            flag = false
            // 根据一级判断二级情况 选中的为二级

            // 清除除选中外其他选中样式
            if (node_id === row['node_id']) {
              // 当前为选中项
              if (row['jd_sx'] === 'CHECKBOX') {
                // 当前选中父级下子级为checkbox
                flag = true
              }
            } else if (row['jd_sx'] === 'RADIO') {
              // 没有选中的项为radio 取消父级的isChecked
              row.isChecked = ''
            }
          } else {

            // 通过该级判断该级子级的选中  取消除当前选中外所有选中样式
            // if (node_id === row['node_id']) {
            //   // 当前为选中项  计算金额总和
            //   if (row['jd_sx'] === 'CHECKBOX') {
            //     // 当前选中父级下子级为checkbox
            //     flag = true
            //   }
            // } else if(row['jd_sx']==='RADIO') {
            //   // 没有选中的项为radio 取消父级的isChecked
            //   row.isChecked = ''
            // }

            // 不取消当前选中的checkbox
            if (!flag) {
              row.isChecked = false
            }

            // 计算金额总和
            if ((parentNode['jd_sx'] === 'RADIO' && parentNode['isChecked'] && parentNode['isChecked'] === row['node_id'])) {
              // 单选且选中
              handlerMoneyCommon(returnData, row, row['node_id'])
            } else if ((parentNode['jd_sx'] === 'CHECKBOX' && (!row['child'] || !row['child'].length) && row['isChecked'])) {
              // 一级为复选框且没有子级，如果有子级则isChecked可能为下一级单选选中值
              handlerMoneyCommon(returnData, row, row['node_id'])
            }
          }
        }
        // 计算选中的金额总和
        if (row['child'] && Array.isArray(row['child']) && row['child'].length > 0) {
          recursionFun(row['child'], row)
        }
      })
    }

    recursionFun(treeData.subs)
    return returnData
  }
  else {
    return returnData
  }
}


/**
 * 仅仅计算选中的总金额
 * @return isReview结算按钮是否禁用，totalMoney选中总金额，
 * */
export const getTotalMoneyOnly = function (treeData) {
  let returnData = {totalMoney: 0, isReview: true, zx_info: []}
  if (Array.isArray(treeData.subs)) {
    let recursionFun=function (recursionData, parentNode) {
      recursionData.forEach(row => {
        if (parentNode === '' || parentNode === undefined || parentNode === null) {
          // 一级
          if (treeData['jd_sx'] === 'RADIO' && treeData['isChecked'] && treeData['isChecked'] === row['node_id']) {
            // 单选且选中
            handlerMoneyCommon(returnData, row, row['node_id'])
          } else if (treeData['jd_sx'] === 'CHECKBOX' && (!row['child'] || !row['child'].length) && row['isChecked']) {
            // 一级为复选框且没有子级，如果有子级则isChecked可能为下一级单选选中值
            handlerMoneyCommon(returnData, row, row['node_id'])
          }
        } else {
          // 非一级
          if ((parentNode['jd_sx'] === 'RADIO' && parentNode['isChecked'] && parentNode['isChecked'] === row['node_id'])) {
            // 单选且选中
            handlerMoneyCommon(returnData, row, row['node_id'])
          } else if ((parentNode['jd_sx'] === 'CHECKBOX' && (!row['child'] || !row['child'].length) && row['isChecked'])) {
            // 一级为复选框且没有子级，如果有子级则isChecked可能为下一级单选选中值
            handlerMoneyCommon(returnData, row, row['node_id'])
          }
        }
        if (row['child'] && Array.isArray(row['child']) && row['child'].length > 0) {
          recursionFun(row['child'], row)
        }
      })
    }

    recursionFun(treeData.subs)
    if (Number(returnData.totalMoney) <= 0 && returnData.isReview) {
      // 总金额为0
      returnData.isReview = false
    }
    return returnData
  } else {
    returnData['isReview'] = false
    return returnData
  }
}

/**
 * 输入验证金额
 * */
export const keyUpRegexFunc = function (value, regexName, lenValue = 64) {
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
        value = /^(\d{1,5})$/.test(value.split('.')[0]) ? value : value.substr(0, 5)
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
}

/**
 * 金额格式转换
 * 返回金额格式
 */
export const moneyFormat = function (str) {
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
}

/**
 * 日期+时间处理
 * */

export const handleDateTime = function (value) {
  return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2) + ' ' + value.substr(8, 2) + ':' + value.substr(10, 2) + ':' + value.substr(12, 2)
}

/**
 * 日期处理
 * */

export const handleDateData = function (value) {
  return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2)
}

/**
 * 页面跳转
 * */

export const goToHrefPage = function (url, params={},target,type) {
  let _newDOM
  if (!document.forms.length) {
    _newDOM = document.createElement('form')
    document.body.appendChild(_newDOM)
  } else {
    _newDOM = document.forms[0]
  }
  _newDOM.target = target || '_self';
  _newDOM.action = url;
  _newDOM.method = type || 'post';
  for (let i = 0; i < _newDOM.childNodes.length; i++) {
    _newDOM.removeChild(_newDOM.childNodes[i]);
    i--;
  }
  for (let keys in params) {
    let childDOM = document.createElement('input')
    childDOM.type = 'text'
    childDOM.name = keys
    childDOM.value = params[keys]
    _newDOM.appendChild(childDOM)
  }
  _newDOM.style.display = 'none'
  _newDOM.submit()
}

/**
 * a标签点击跳转
 * @params url——跳转url id——a标签id[AGoTo] target——在本页面打开还是新页面打开_self/_blank
 * */
export const goToHrefATage=function(url,id='AGoTo',target='_self'){
  let a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', target);
  a.setAttribute('id', id);
  a.setAttribute('display','none');
  // 防止反复添加
  if(!document.getElementById(id)) {
    document.body.appendChild(a);
  }
  a.click();
}

