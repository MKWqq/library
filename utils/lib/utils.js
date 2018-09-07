module.exports = {
    // todo 页面跳转——form表单
    /**
     * 页面跳转
     * */
    goToHrefPage: function (url, params) {
        let _newDOM
        if (!document.forms.length) {
            _newDOM = document.createElement('form')
            document.body.appendChild(_newDOM)
        } else {
            _newDOM = document.forms[0]
        }
        _newDOM.action = url
        _newDOM.method = 'post'
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
    },
    // todo 数组使用，是则返回数组；拦截错误 try catch
    returnArr: function (data) {
        if (!Array.isArray(data)) {
            try {
                data = Array.from(data)
            }
            catch (e) {
                data = []
            }
        }
        return data
    },
    // todo 检测是否为数组
    /**
     * 判断是否为数组
     * */
    isArrayFun: function (arg) {
        let arrString = Object.prototype.toString.call([])
        if (Object.prototype.toString.call(arg) === arrString) {
            return true
        } else {
            return false
        }
    },
    // todo 两个变量值【数值类】互换 用异或运算符^
    /**
     * first ^= end——等价于first = first ^ end
     * */
    changeVariable: function (first, end) {
        first ^= end;
        end ^= first;
        first ^= end;
        return {first, end}
    },
    // todo 将颜色的 RGB 值转为 HEX 值
    /**
     * @params r——对应rgb(100,233,223)中的第一个，依次类推。。
     * 参数值范围：0-255
     * */
    rgb2hex: function (r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16) // 先转成十六进制，然后返回字符串
            .substr(1);   // 去除字符串的最高位，返回后面六个字符串
    },
    // todo 浏览器打印
    /**
     * 打印指定区域内容
     * */
    printContent: function (e) {
        let subOutputRankPrint = document.getElementById('oo');
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
    }
}