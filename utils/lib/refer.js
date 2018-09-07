// 公共使用的方法
import getLodop from './instance/print/LodopFuncs.js'

var printTimer = null

function getPrintInitObj() {
    if (!window.localStorage.printInformation) {
        let rowObj = {
            TaskID1: '',// 当前任务状态码
            TaskID2: '',// 判断是否在打印任务中
            P_ID: '', //当前任务
            waitingNum: 0,//当前任务等待次数
            loop: 0//打印次数
        }
        window.localStorage.printInformation = JSON.stringify(rowObj)
    }
}

function PrintWait(strBodyHtml, self,resolve,reject) {
    getPrintInitObj()
    let LODOP=getCLodop()
    let printInfoObject = JSON.parse(window.localStorage.printInformation)
    // if (printInfoObject.waitingNum>0) {self.$showFailureMsg('正在打印！');return;}

    LODOP.PRINT_INIT("");
    LODOP.ADD_PRINT_HTM(10, 55, "80%", "80%", strBodyHtml);
    LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
    if (LODOP.CVERSION) {
        LODOP.On_Return = function (TaskID, Value) {
            printInfoObject.P_ID = Value;
            if (printInfoObject.P_ID != "") {
                printInfoObject.waitingNum = 0;
                window.localStorage.printInformation = JSON.stringify(printInfoObject)
                printTimer = window.setInterval(function () {
                    C_WaitFor(resolve, reject)
                }, 1000);
            }
            // else{
            //   ControlPrinterPURGE(TaskID,self)
            //   // reject('打印机连接失败')
            // }
        }
        LODOP.PRINT();
    } else {
        printInfoObject.P_ID = LODOP.PRINTA();
        if (printInfoObject.P_ID != "") {
            printInfoObject.waitingNum = 0;
            window.localStorage.printInformation = JSON.stringify(printInfoObject)
            printTimer = window.setInterval(function () {
                WaitFor(resolve, reject)
            }, 1000)
        }
    }
}

function WaitFor(resolve, reject) {
    getPrintInitObj()
    let LODOP=getCLodop()
    let printInfoObject = JSON.parse(window.localStorage.printInformation)
    printInfoObject.waitingNum = printInfoObject.waitingNum + 1;
    if (LODOP.GET_VALUE("PRINT_STATUS_OK", printInfoObject.P_ID)) {
        clearInterval(printTimer);
        // 打印成功——执行代码
        printInfoObject.waitingNum = 0;
    } else if ((!LODOP.GET_VALUE("PRINT_STATUS_EXIST", printInfoObject.P_ID)) && (printInfoObject.waitingNum > 0)) {
        // 打印任务被删除——执行代码
        clearInterval(printTimer);
        printInfoObject.waitingNum = 0;
        resolve(true)
    }
    else if (printInfoObject.waitingNum > 50) {
        clearInterval(printTimer);
        printInfoObject.waitingNum = 0;
        ControlPrinterPURGE(printInfoObject.P_ID, self)
        reject('打印超时！')
        // alert("打印超过30秒没捕获到成功状态！");
    }
    window.localStorage.printInformation = JSON.stringify(printInfoObject)
}

function C_WaitFor(resolve, reject) {
    getPrintInitObj()
    let LODOP=getCLodop()
    var printInfoObject = JSON.parse(window.localStorage.printInformation)
    printInfoObject.waitingNum = printInfoObject.waitingNum + 1;
    LODOP.On_Return_Remain = true;
    LODOP.On_Return = function (TaskID, Value) {
        // console.log(111, printInfoObject, 'TaskID', TaskID, 'Value', Value);
        if (TaskID == printInfoObject.TaskID1) {
            if (Value == 1) {
                // 打印成功——执行代码
                clearInterval(printTimer);
                // alert(TaskID+" "+Value);
                // console.log('成功，执行第二个打印')
                printInfoObject.waitingNum = 0;
                // printInfoObject.loop += 1
            }
        } else if (TaskID == printInfoObject.TaskID2) {
            if (Value == 0) {
                // 打印任务被删除——执行代码
                clearInterval(printTimer);
                printInfoObject.waitingNum = 0;
                printInfoObject.loop += 1
                resolve(true)
                // console.log("打印任务被删除！执行第二个打印");
            }
        }
        window.localStorage.printInformation = JSON.stringify(printInfoObject)
    };
    printInfoObject.TaskID1 = LODOP.GET_VALUE("PRINT_STATUS_OK", printInfoObject.P_ID);
    printInfoObject.TaskID2 = LODOP.GET_VALUE("PRINT_STATUS_EXIST", printInfoObject.P_ID);
    if (printInfoObject.waitingNum > 50) {
        clearInterval(printTimer);
        printInfoObject.waitingNum = 0;
        window.localStorage.printInformation = JSON.stringify(printInfoObject)
        ControlPrinterPURGE(printInfoObject.P_ID, self)
        reject('打印超时！')
        // alert("打印超过50秒没捕获到成功状态！");
    }
}

function GetPrinterIDfromJOBID(strJOBID) {
    var intPos = strJOBID.indexOf("_");
    if (intPos < 0) {
        return strJOBID;
    } else {
        return strJOBID.substr(0, intPos);
    }
}

function ControlPrinterPURGE(strJOBID, self) {
    let strPrinterID = GetPrinterIDfromJOBID(strJOBID);
    let LODOP
    getLodop().then(data => {
        LODOP=data
        if (LODOP.CVERSION) {
            LODOP.On_Return = function (TaskID, Value) {
                if (Value == 'ok') {
                    self.$showSuccessMsg('清除打印任务成功！')
                } else {
                    self.$showFailureMsg('清除打印任务失败！')
                }
            };
            LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "PURGE");
            return;
        } else {
            var strResult = LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "PURGE");
            if (strResult == 'ok') {
                self.$showSuccessMsg('清除打印任务成功！')
            } else {
                self.$showFailureMsg('清除打印任务失败！')
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
module.exports={
    // todo input框必填字段统一验证
    /**
     * 验证，含正则含必填
     * 返回错误提示语
     * _regexArr=[
     {'mc':{lengthRegex:{errCode:'YSK_ZX_SFXMC_CD',params:64},required:'YSK_ZX_SFXMC_BT'}},
     {'lx':{required:'YSK_ZX_SFXLX_BT'}},
     {'dk_index_no':{positiveInterger:{errCode:'YSK_ZX_CDSX_GS'},lengthRegex:{errCode:'YSK_ZX_CDSX_CD',params:6},required:'YSK_ZX_CDSX_BT'}}
     ]——lengthRegex为验证方法名
     currentObject——需要验证的对象
     */
    checkMustRegexInput: function (mustRegexArr, currentObject) {
        let _this = this
        let returnErrArr = []
        mustRegexArr.forEach(totalRow => {
            let field = Object.keys(totalRow)[0]//页面绑定字段
            let _rowObject = totalRow[field]
            let _rowRegexFunc = Object.keys(totalRow[field])
            _rowRegexFunc.forEach(regexItem => {
                if (regexItem === 'required') {
                    // 必填
                    if (currentObject[field] === '' || currentObject[field] === undefined || currentObject[field] === null) {
                        // todo 需要根据项目注入errCode
                        // let _errText = self.$errCode[_rowObject[regexItem]['errCode']] ? self.$errCode[_rowObject[regexItem]['errCode']] : '必填字段未填写'
                        // returnErrArr.push(_errText)
                    }
                } else {
                    if (_this[regexItem] && _this[regexItem](currentObject[field], _rowObject[regexItem]['params'])) {
                        // 格式错误
                        // let _errText = self.$errCode[_rowObject[regexItem]['errCode']] ? self.$errCode[_rowObject[regexItem]['errCode']] : '格式错误'
                        // returnErrArr.push(_errText)
                    }
                }
            })
        })
        if (returnErrArr.length > 0) {
            return returnErrArr.join('，')
        } else {
            return false
        }
    },
    // todo 打印
    /**
     * 打印
     * */
    checkPrinter: function (self) {
        // let LODOP = getLodop();
        return new Promise((resolve,reject)=>{
            getLodop().then(()=>{
                resolve('print0000')
            }).catch((err) => {
                if (constant.printStyle === 'cloud') {
                    self.$showFailureMsg('云打印服务异常！')
                } else {
                    self.isPrintDialog = true
                    self.printDialogHTML = err
                }
                reject('print0001')
            })
        })
    },
    printFuncLoop: function (printDOMID, self) {
        let LODOP;
        return new Promise((resolve,reject)=>{
            getLodop().then((data) => {
                LODOP = data
                let styleCssInnerHTML = document.getElementById('printCss').innerHTML
                let strStyle = "<style>" + styleCssInnerHTML + "</style>"
                let strBodyHtml = strStyle + "<body>" + document.getElementById(printDOMID).innerHTML + "</body>"
                return PrintWait(strBodyHtml, self,resolve,reject)
            }).catch((err) => {
                if (constant.printStyle === 'cloud') {
                    self.$showFailureMsg('云打印服务异常！')
                } else {
                    self.isPrintDialog = true
                    self.printDialogHTML = err
                }
            })
        })
        // if (constant.printStyle === 'cloud') {
        //   if (LODOP) {
        //     let styleCssInnerHTML = document.getElementById('printCss').innerHTML
        //     let strStyle = "<style>" + styleCssInnerHTML + "</style>"
        //     let strBodyHtml = strStyle + "<body>" + document.getElementById(printDOMID).innerHTML + "</body>"
        //     return PrintWait(strBodyHtml, self)
        //     // self.printData = null
        //   } else {
        //     self.$showFailureMsg('云打印服务异常！')
        //   }
        // } else {
        //   if (LODOP) {
        //     if (typeof LODOP === 'string') {
        //       self.isPrintDialog = true
        //       self.printDialogHTML = LODOP
        //     } else {
        //       let styleCssInnerHTML = document.getElementById('printCss').innerHTML
        //       let strStyle = "<style>" + styleCssInnerHTML + "</style>"
        //       let strBodyHtml = strStyle + "<body>" + document.getElementById(printDOMID).innerHTML + "</body>"
        //       return PrintWait(strBodyHtml, self)
        //     }
        //   }
        // }
    },
}