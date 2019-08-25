import axios from 'axios'
import store from '@/store'

// 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置请求头token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, function (err) {
  return Promise.reject(err)
}
)

export default axios
