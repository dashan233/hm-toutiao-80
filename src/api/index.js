import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBIG from 'json-bigint'

// 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置请求头token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, function (err) {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取状态码
  const status = err.response.status
  if (status === 401) {
    // 清除无效token
    store.delUser()
    // 跳转到登录页面
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
