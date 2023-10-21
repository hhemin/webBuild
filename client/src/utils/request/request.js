
/**
 * @name: luch-request uni-app跨平台请求库
 * @description: https://www.quanzhan.co/luch-request/
 */
import Request from 'luch-request'
import CustomResultCode from "./CustomResultCode"

const { VUE_APP_BASE_API,VUE_APP_CONTEXT_PATH } = process.env;
// type TCustomOptions = {
//   // repeat_request_cancel: Boolean; // 是否开启取消重复请求, 默认为 false [目前会选择最后一个给予回调，取消都是前面的请求]
//   // screen_loading: Boolean; // 是否开启全屏层效果, 默认为false
//   // // reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
//   // error_message_show: Boolean; // 是否开启接口错误信息展示,默认为true
//   // code_message_show: Boolean; // 是否开启code不为0时的信息提示, 默认为false
//   // routeChangeCancel: Boolean; // 开启路由切换时候停止加载
//   baseURL: String; // 修改baseurl
//   isSd:Boolean,// sd接口
// };

const DEF_CustomOptions = {
  baseURL:VUE_APP_BASE_API + VUE_APP_CONTEXT_PATH,
}

function MyHttp(config,customOptions) {
  const {baseURL} = {...DEF_CustomOptions,...customOptions};
  const http = new Request({
    //设置请求的base url
    baseURL,
    //超时时长5分钟
    timeout: 300000,
    header: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
    },
    ...config,
})
//请求拦截器
http.interceptors.request.use(
    (config) => {
        // 拦截添加token
        // config.header = {
        //     'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
        // }
        return config
    },
    (error) => {
        return Promise.resolve(error)
    }
)
 
// 响应拦截器
http.interceptors.response.use(
    (response) => {
      // 处理返回状态
        const {code,data = {},msg =""} = response.data
        if (code === 2014) {
          // 判断还没注册、或者登陆过期等等
          return uni.navigateTo({
            url: '/pages/login/login',
          });
        }

        if(code == 200) {
          return data
        }else {
          // CustomResultCode(code)
          uni.showToast({
            title: msg || "Error",
            icon: 'none'
          })
          return Promise.reject(data)
        }
    },
    (error) => {
        console.log('响应拦截器错误捕获', error)
        return Promise.resolve(error)
    }
)
return http.request(config)
}
export default MyHttp