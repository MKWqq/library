var CreatedOKLodop7766 = null;
var constant = require('./constant')
// ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"

var getLodop
if (constant.printStyle === 'cloud') {

    //====页面引用CLodop云打印必须的JS文件：====
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var LODOP
    var oscript = document.createElement("script");
    oscript.src ="http://"+constant.printHost+":"+constant.printPort1+"/CLodopfuncs.js?priority=1";
    // oscript.src = "http://192.168.0.176:8000/CLodopfuncs.js?priority=0";
    head.insertBefore(oscript, head.firstChild);

    //引用双端口(8000和18000）避免其中某个被占用：
    oscript = document.createElement("script");
    oscript.src ="http://"+constant.printHost+":"+constant.printPort2+"/CLodopfuncs.js?priority=0";
    // oscript.src = "http://192.168.0.176:18000/CLodopfuncs.js?priority=0";
    head.insertBefore(oscript, head.firstChild);
}

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) != null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((verTrident == null) && (verIE == null) && (x64 !== null))
            return true; else if (verFF !== null) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64 !== null)) return true;
        } else if (verOPR !== null) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32) return true;
        } else if ((verTrident == null) && (verIE == null)) {
            var verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome !== null) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41) return true;
            }
            ;
        }
        ;
        return false;
    } catch (err) {
        return true;
    }
    ;
}

if (constant.printStyle === 'cloud') {

    //====页面引用CLodop云打印必须的JS文件：====
    getLodop = function (oOBJECT, oEMBED) {
        return new Promise((resolve, reject) => {
            try {
                LODOP = getCLodop();
            } catch (err) {
                reject('打印服务未开启！')
                // console.log('打印服务未开启！')
            }
            if (!LODOP && document.readyState !== "complete") {
                reject("C-Lodop没准备好，请稍后再试！")
                // alert("C-Lodop没准备好，请稍后再试！");
                return;
            }
            //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
            resolve(LODOP)
            return LODOP
        })
    }
}
else {
    // //====页面引用CLodop云打印必须的JS文件：====
    if (needCLodop()) {
        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        var oscript = document.createElement("script");
        oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
        head.insertBefore(oscript, head.firstChild);

        //引用双端口(8000和18000）避免其中某个被占用：
        oscript = document.createElement("script");
        oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
        head.insertBefore(oscript, head.firstChild);
    }
    ;

//====获取LODOP对象的主过程：====
    getLodop = function (oOBJECT, oEMBED) {
        return new Promise((resolve, reject) => {
            var strHtmInstall = "<br><font color='#999'>打印控件未安装!点击这里<a href='/api/getPrintFile' target='_self'>执行安装</a>,<span style='color:#ff4867;'>安装后请刷新页面或重新进入</span>。</font>";
            var strHtmUpdate = "<br><font color='#999'>打印控件需要升级!点击这里<a href='/api/getPrintFile' target='_self'>执行升级</a>,<span style='color:#ff4867;'>升级后请重新进入</span>。</font>";
            var strHtm64_Install = "<br><font color='#999'>打印控件未安装!点击这里<a href='/api/getPrintFile' target='_self'>执行安装</a>,<span style='color:#ff4867;'>安装后请刷新页面或重新进入</span>。</font>";
            var strHtm64_Update = "<br><font color='#999'>打印控件需要升级!点击这里<a href='/api/getPrintFile' target='_self'>执行升级</a>,<span style='color:#ff4867;'>升级后请重新进入</span>。</font>";
            var strHtmFireFox = "<br><br><font color='#999'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
            var strHtmChrome = "<br><br><font color='#999'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
            var strCLodopInstall = "<br><font color='#999'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='/api/getPrintFile' target='_self'>执行安装</a>,<span style='color:#ff4867;'>安装后请刷新页面</span>。</font>";
            var strCLodopUpdate = "<br><font color='#999'>CLodop云打印服务需升级!点击这里<a href='/api/getPrintFile' target='_self'>执行升级</a>,<span style='color:#ff4867;'>升级后请刷新页面</span>。</font>";
            var LODOP;
            try {
                var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
                if (needCLodop()) {
                    // getCLodop()获取云对象
                    try {
                        LODOP = getCLodop();
                    } catch (err) {
                        // reject('Lodop插件未安装')
                        console.log('Lodop插件未安装');
                    }
                    ;
                    if (!LODOP && document.readyState !== "complete") {
                        // console.log("C-Lodop没准备好，请稍后再试！");
                        reject("C-Lodop没准备好，请稍后再试！")
                        return;
                    }
                    if (!LODOP) {
                        // 返回下载lodop插件的html标签
                        reject(strCLodopInstall)
                        // return strCLodopInstall
                        // if (isIE) document.write(strCLodopInstall); else
                        //   document.body.innerHTML=strCLodopInstall+document.body.innerHTML;
                        return;
                    } else {
                        //用CVERSION判断是否为云打印，升级lodop插件
                        if (CLODOP.CVERSION < "3.0.2.9") {
                            reject(strCLodopUpdate)
                            return
                            // return strCLodopUpdate
                            // if (isIE) document.write(strCLodopUpdate); else
                            //   document.body.innerHTML=strCLodopUpdate+document.body.innerHTML;
                        }
                        ;
                        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
                    }
                    ;
                }
                else {
                    var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
                    //=====如果页面有Lodop就直接使用，没有则新建:==========
                    if (oOBJECT != undefined || oEMBED != undefined) {
                        if (isIE) LODOP = oOBJECT; else LODOP = oEMBED;
                    } else if (CreatedOKLodop7766 == null) {
                        LODOP = document.createElement("object");
                        LODOP.setAttribute("width", 0);
                        LODOP.setAttribute("height", 0);
                        LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                        if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                        else LODOP.setAttribute("type", "application/x-print-lodop");
                        document.documentElement.appendChild(LODOP);
                        CreatedOKLodop7766 = LODOP;
                    } else LODOP = CreatedOKLodop7766;
                    //=====Lodop插件未安装时提示下载地址:==========
                    if ((LODOP == null) || (typeof(LODOP.VERSION) == "undefined")) {
                        if (navigator.userAgent.indexOf('Chrome') >= 0) {
                            reject(strHtmChrome)
                            return
                            // return strHtmChrome
                        }
                        if (navigator.userAgent.indexOf('Firefox') >= 0) {
                            reject(strHtmFireFox)
                            return
                            // return strHtmFireFox
                        }
                        if (is64IE) {
                            reject(strHtm64_Install)
                            return
                            // return strHtm64_Install
                        } else if (isIE) {
                            reject(strHtmInstall)
                            return
                            // return strHtmInstall
                        } else {
                            reject(strHtmInstall)
                            return
                            // return strHtmInstall
                        }
                    }
                    resolve(LODOP)
                    return
                    // return LODOP;
                }
                // 版本过低
                if (LODOP.VERSION < "6.2.2.1") {
                    if (!needCLodop()) {
                        //64位lodop插件版本升级

                        // if (is64IE) document.write(strHtm64_Update); else
                        // if (isIE) document.write(strHtmUpdate); else
                        //   document.body.innerHTML=strHtmUpdate+document.body.innerHTML;
                        if (is64IE) {
                            reject(strHtm64_Update)
                            return
                            // return strHtm64_Update
                        } else {
                            reject(strHtmUpdate)
                            return
                            // return strHtmUpdate
                        }
                        // if (isIE) return strHtmUpdate else
                        //   return strHtmUpdate
                    }
                    resolve(LODOP)
                    return
                    // return LODOP;
                }
                //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
                // LODOP.SET_LICENSES("", "13528A153BAEE3A0254B9507DCDE2839", "", "");
                //===========================================================
                resolve(LODOP)
                return
                // return LODOP;
            } catch (err) {
                console.log("getLodop出错:" + err);
            }
        })
    }
}


export default getLodop



