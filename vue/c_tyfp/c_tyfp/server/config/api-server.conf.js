/**
 * server配置信息
 * NODE_NOTLOGIN——未登录
 * NODE_SIGNERROR——验签失败
 * NODE_NOUSERID——通过sessionId查userId失败
 * NODE_COOKIEEMPTY——该cookie值为空
 * */
var env=process.env.RUN_ENV
var CONFIGS={
  local:{
    log4jsOutType: 'console',
    TYFPServer: {
      pramary_key:'axinfu',
      Authorization: 'Basic YXBwOmFwcA=='
    }
  },
  preview:{
    log4jsOutType: 'file',
    TYFPServer: {
      pramary_key:'axinfu',
      Authorization: 'Basic YXBwOmFwcA=='
    }
  },
  online:{
    log4jsOutType: 'file',
    TYFPServer: {
      pramary_key:'axinfu',
      Authorization: 'Basic YXBwOmFwcA=='
    }
  }
}
module.exports=CONFIGS[env]||CONFIGS['local']
