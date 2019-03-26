/**
 * title: http请求
 * author: x
 * date: x
 * description:
 */

import axios from 'axios'


axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = '/tyfp'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  return config
}, (error) => {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    let resp = response.data.resp_info
    if (resp.resp_code === '200') {
      if (resp.biz_code === '1000') {
        return response.data.resp_data
      }
      else {
        if(resp.biz_code === 'NODE_NOTLOGIN'){
          // 未登录
          location.href='../login/login.html'
        }else{
          let err = new Error()
          err.message = resp.biz_msg?resp.biz_msg:'系统出错，请联系管理员！'
          err.code = resp.biz_code
          err.data = response.data
          return Promise.reject(err)
        }
      }
    } else {
      let err = new Error()
      err.message = resp.resp_msg?resp.resp_msg:'系统出错，请联系管理员！'
      err.code = resp.resp_code
      err.data = response.data
      return Promise.reject(err)
    }
  } else {
    let err = new Error()
    err.message = '系统出错，请联系管理员'
    err.code = response.status
    err.data = response.data
    return Promise.reject(err)
  }
}, (error) => {
  if (error && error.response) {
    let err = new Error()
    err.message = '系统出错，请联系管理员'
    err.code = error.response.status
    err.data = error.response.data
    return Promise.reject(err)
  } else {
    let err = new Error()
    err.message = '系统出错，请联系管理员'
    err.code = 0
    err.data = 'null'
    return Promise.reject(err)
  }
})

export default {
  axios: axios
}
