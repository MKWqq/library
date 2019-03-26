import Vue from 'vue'
import App from './APP'
import router from './router'
import store from './store'
import 'babel-polyfill'
import ES6Promise from 'es6-promise'
import ElementUI from 'element-ui'
import {Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/pcCommon.css'
var loadingInstance='';

const Promise = ES6Promise.Promise

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach(function(to,from,next){
  if(to.name==='MainPage' || to.name==='MainPageAlias' || to.name==='OrderManagement'){
    store.commit('SetActiveNav',to.name);
  }
  next();
});

/**
 * 用于EventBus
 * @type {Vue}
 */
Vue.prototype.$EventBus = new Vue()

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
})
/**
 * 显示成功Toast
 * @param text
 */
Vue.prototype.$showSuccessMsg = function (text) {
  this.$message({
    message: text,
    type: 'success'
  })
}

/**
 * 显示失败Toast
 * @param text
 */
Vue.prototype.$showFailureMsg = function (text) {
  this.$message({
    message: text,
    type: 'error',
    duration: 3000
  })
}

/**
 * 显示加载loading
 */
Vue.prototype.$showViewLoading = function () {
  if (loadingInstance) {
    loadingInstance.close()
  }
  loadingInstance = Loading.service({
    target: '#main-view-body',
    // lock: true,
    // text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0)'
  })
};

/**
 * 关闭加载loading
 */
Vue.prototype.$closeViewLoading = function () {
  loadingInstance.close()
}

/**
 * 显示全屏加载
 */
Vue.prototype.$showFullLoading = function () {
  if (loadingInstance) {
    loadingInstance.close()
  }
  loadingInstance = Loading.service({
    fullscreen: true,
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0)'
  })
}

/**
 * 关闭全屏loading
 */
Vue.prototype.$closeFullLoading = function () {
  loadingInstance.close()
}


new Vue({
  el: '#app',
  router,
  store,
  Promise,
  template: '<App/>',
  components: {App}
})
