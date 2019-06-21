import axios from 'axios'
// 设置基准路径
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// export default
var myaxios = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 获取token,传递
  // 1.获取token
  var token = localStorage.getItem('itcastpro_token')
  if (token) {
    // 在发送请求的时候传递token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default myaxios
// 报错
// module.exports = axios
