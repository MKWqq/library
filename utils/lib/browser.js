// Browser environment sniffing
// window.navigator.userAgent——当前浏览器信息
export const inBrowser = typeof window !== 'undefined'
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

/**
 * 获取cookie值
 * */
export const getCookie= function (reqCookie) {
    let Cookies ={};
    if (reqCookie != null) {
        reqCookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    return Cookies
}

