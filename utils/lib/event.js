/**
 * js处理event事件
 * 2018-12-10
 * */

function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false)
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler)
    }else{
        element['on'+type]=handler
    }
}
function removeHandler(element,type,handler){
    if(element.removeEventListener){
        element.removeEventListener(type,handler,false)
    }else if(element.detachEvent){
        element.detachEvent('on'+type,handler)
    }else{
        element['on'+type]=null
    }
}
module.exports={
    addHandler:addHandler,
    removeHandler:removeHandler
}
