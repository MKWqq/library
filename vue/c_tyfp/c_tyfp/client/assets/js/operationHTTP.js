// 操作、修改、新建等http请求
import Http from '../../mobile/api/http'

export default {
  getDataToPageHttp: function (url, params = {}, self, refDataGrid = 'datagrid') {
    let _params = params
    // let _ref = refDataGrid
    // self.$showViewLoading()
    return new Promise(function (resolve, reject) {
      Http.axios.post(url, _params).then((data) => {
        // self.$closeViewLoading()
        resolve(data)
      }).catch((e) => {
        // self.$closeViewLoading()
        // self.$showFailureMsg(e.message)
        reject(e)
      })
    })
  }
}

