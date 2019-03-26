import Vue from 'vue'
import App from './APP'
import router from './router'
import store from './store'
import 'babel-polyfill'
import ES6Promise from 'es6-promise'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import '../../assets/css/common.css'
import {Radio, Checkbox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Indicator} from 'mint-ui'
import {Toast} from 'mint-ui';

Vue.use(Mint);
Vue.use(Radio);
Vue.use(Checkbox);

const Promise = ES6Promise.Promise;

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   Http.axios.post('/get/server/file').then(data=>{
//     next()
//   }).catch(err=>{
//     Toast.fail(err.message)
//   })
// })

/**
 * 用于EventBus
 * @type {Vue}
 */
Vue.prototype.$EventBus = new Vue();

Vue.filter('jeFormat', function (value) {
  let str = value
  let returnStr
  if (typeof str !== 'string') {
    str = String(str)
  }
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  if (str.indexOf(".") == -1) {

    returnStr = str.replace(regex, ',') + '.00';

  } else {
    var newStr = str.split('.');
    returnStr = newStr[0].replace(regex, ',');

    if (newStr[1].length <= 1) {
      //小数点后只有一位时
      returnStr = returnStr + '.' + newStr[1] + '0';

    } else if (newStr[1].length > 1) {
      //小数点后两位以上时
      var decimals = newStr[1].substr(0, 2);
      returnStr = returnStr + '.' + decimals;
    }
  }
  return returnStr
  // if(value===null || value===undefined || value===''){
  //
  // }
  // else{
  //   return ''
  // }
});

/**
 * 文字提示Toast
 * @param text
 */
Vue.prototype.$showTextPrompt = function (text) {
};

/**
 * 显示成功Toast
 * @param text
 */
Vue.prototype.$showSuccessMsg = function (text) {
  Toast({
    message: text,
    iconClass: 'icon icon-success',
    duration: 2000
  })
};

/**
 * 显示失败Toast
 * @param text
 */
Vue.prototype.$showFailureMsg = function (text) {
  Toast({
    message: text,
    iconClass: 'icon icon-error',
    duration: 2000
  })
};

Vue.prototype.$showViewLoading = function (text) {
  Indicator.open()
};
Vue.prototype.$closeViewLoading = function (toast) {
  Indicator.close()
};


new Vue({
  el: '#app',
  router,
  store,
  Promise,
  template: '<App/>',
  components: {App}
});
