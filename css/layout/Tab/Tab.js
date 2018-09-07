/**
 * @name: 基本css样式
 * @description: 常见的css效果
 * @author: wangqingqing
 * @update: 2018-01-22
 */
(function(){
    var _bodyDOM=$('body');
    var _navLiDOM=$('.j-navLi');
    _navLiDOM.on('click',changeNavCss);
    /* nav导航点击事件 */
    function changeNavCss(event){
        var _oldActiveLiDOM=$('.z-active'),_target=$(event.currentTarget);
        _oldActiveLiDOM.removeClass('z-active');
        _target.addClass('z-active');
    }
})();
