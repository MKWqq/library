import operationHTTP from './operationHTTP'

// 公共处理数组方法
function commonInterfaceHttp(self, pageData, _params) {
  let _self = self
  let _pageData = pageData
  let url = '/upms-sys/sysdicitem/findListCon'
  return new Promise(function(resolve,reject){
    operationHTTP.getDataToPageHttp(url, _params, _self).then(data => {
      let _data = data.resp_data
      _self[_pageData] = []
      if (Array.isArray(_data)) {
        _data.forEach(item => {
          _self[_pageData].push({label: item.item_name, value: item.item_code})
        })
        // return returnArr
        resolve()
      }
    }).catch(e=>{
      reject(e)
    })
  })
}
function commonKVInterfaceHttp(self, pageData, _params) {
  let _self = self
  let _pageData = pageData
  let url = '/upms-sys/sysdicitem/findMapKV'
  return new Promise(function(resolve,reject){
    operationHTTP.getDataToPageHttp(url, _params, _self).then(data => {
      _self[_pageData]=data.resp_data
      resolve()
    }).catch(e=>{
      reject(e)
    })
  })
}

// 收费年度
export const getChargeYearDataHttp = function (self, pageData) {
  let _params = {
    dic_code: 'SF_XM_SFND'
  }
  return new Promise(function(resolve,reject){
    commonInterfaceHttp(self, pageData, _params).then(()=>{
      resolve()
    }).catch((err)=>{
      console.log('收费年度查询错误');
    })
  })
}
export const getChargeYearKVDataHttp = function (self, pageData) {
  let _params = {
    dic_code: 'SF_XM_SFND'
  }
  return new Promise(function(resolve,reject){
    commonKVInterfaceHttp(self, pageData, _params).then(()=>{
      resolve()
    }).catch((err)=>{
      console.log('收费年度KV查询错误');
    })
  })
}

