/**
 * @name: 操作flex布局DOM
 * @description: flex布局适用于IE10+/safari6.1+/firefox22+/opera12.1+/chrome21+
 * @author: wangqingqing
 * @update: 2018-01-12
 */


(function () {
    /* select框name值+'-'+select选中的值组成的class为修改flex样式的class */
    var _oldTargetSelectValue;
    <!-- 获取select对象 -->
    var _selectDOM = $('.j-flex-select'), _body = $('body');
    //为select选择框添加change事件
    _body.on('change', _selectDOM, changeFlexDirection);

    function changeFlexDirection(event) {
        var _eventTarget = $(event.target || event.srcElement);
        //当前选中的值
        var _targetSelectValue = _eventTarget.val();
        //获取select框的name值，由此判断哪个修改哪个版块的class与显示class的内容
        var _targetSelectName = _eventTarget.attr('name').toString();
        //获取class展示的html内容
        var _targetClassShowDOMHTML=$(".j-"+_targetSelectName).html();
        //被修改class的DOM对象
        var _changeClassDOM = $("div[class*=" + _targetSelectName + "]");
        //需删除的class名
        var _targetDeleteClassNameArr=_changeClassDOM.attr('class').split(' ').filter(function(val,idx){
            return val.indexOf(_targetSelectName)>=0;
        });
        //修改class
        if(_targetDeleteClassNameArr.length>0){
            _targetDeleteClassNameArr.forEach(function(val,idx){
                _changeClassDOM.removeClass(val);
            });
        }
        _changeClassDOM.addClass(_targetSelectName + '-' + _targetSelectValue);
        //修改class名显示的HTML内容
        $(".j-"+_targetSelectName).html(_changeClassDOM.attr('class'));
    }
})();



