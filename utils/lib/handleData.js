/**
 * 处理数据
 * 2018-12-10
 * */

function descendFunc(handleArr){
    function compare(first,second){
        return second-first
    }

    if(Object.prototype.toString.call(handleArr)==='[object Array]'){
        return handleArr.sort(compare)
    }
    else{
        console.log('数据格式错误！');
        return []
    }
}
function ascendFunc(handleArr){
    function compare(first,second){
        return -(second-first)
    }

    if(Object.prototype.toString.call(handleArr)==='[object Array]'){
        return handleArr.sort(compare)
    }
    else{
        console.log('数据格式错误！');
        return []
    }
}
module.exports={
    descendFunc:descendFunc,
    ascendFunc:ascendFunc
};
