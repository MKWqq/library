
module.exports = {
  // 修改过路径
  clientHomePath: process.env.NODE_ENV === 'production' ? '../home/index.html' : '../home/index.html',
  clientLoginPath: process.env.NODE_ENV === 'production' ? '../login/login.html#' : '../login/login.html#',
}
