// 前端系统常量
// import activeImg from 'images/icon-biao-2.png'
var activeCheckeboxImg=require('images/dxx-xz.png')
var normalCheckeboxImg=require('images/dxx.png')

module.exports = {
  /**
   * 成功提示信息
   */
  successPromptTotal: {
    exportPrompt: '文件导入中，可消息中心查看导入结果',
    exportFormatPrompt: '系统需要表格数据格式错误',
    handlerPrompt: '操作成功'
  },
  /**
   * 具有项目信息查询business_key
   */
  checkProjectBusinessKey: [
    {business_key: 'ReceivableHomePage', dl_dm: 'YSK', has_project_business_key: 'GainDetailsEmpty'}
  ],
  /**
   * 短信验证码倒计时
   */
  verifyCodeCountdown: 120,
  /**
   * DataGrid控件pageSize数组(修改)
   */
  dataGridPageSizeArr: [10, 15, 30],
  /**
   * 版本号
   */
  version: 'v1.1.0',
  /**
   * buildCode
   */
  buildCode: 39,
  /*epay_web*/
  checkboxIcon:{
    normal:normalCheckeboxImg,
    active:activeCheckeboxImg
  }
}
