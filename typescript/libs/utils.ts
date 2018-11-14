/**
 * 项目中常用的公共方法
 * */

// todo 取cookie值
export const getCookie=function(reqCookie:string):object{
    let Cookies ={};
    if (reqCookie != null) {
        reqCookie.split(';').forEach(item => {
            var parts:Array<any> = item.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    return Cookies
}

