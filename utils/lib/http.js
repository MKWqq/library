/**
 * 得到cookie键值对
 * @params reqCookie为响应头部的cookie字符串
 * @returns cookie的键值对
 */
module.exports.getCookie = function (reqCookie) {
    let Cookies ={};
    if (reqCookie != null) {
        reqCookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    return Cookies
}