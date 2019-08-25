const KEY = '80-user'
export default {
  // 设置存储
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取存储对象
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    // JSON.parse(jsonStr) 把数据变成对象
    return JSON.parse(jsonStr)
  },
  // 删除用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
