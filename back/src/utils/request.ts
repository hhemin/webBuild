import axios from "axios";
import { Message, MessageBox, Loading } from "element-ui";
import { UserModule } from "@/store/modules/user";
export const pendingMap = new Map();

const LoadingInstance: {
  _target: any;
  _count: number;
} = {
  _target: null, // DOM操作
  _count: 0, // 次数
};
/**
 * 网络配置参考来源
 * https://juejin.cn/post/6968487137670856711#heading-3
 * https://juejin.cn/post/6968630178163458084#heading-27
 * */

type TCustomOptions = {
  repeat_request_cancel: Boolean; // 是否开启取消重复请求, 默认为 false [目前会选择最后一个给予回调，取消都是前面的请求]
  screen_loading: Boolean; // 是否开启全屏层效果, 默认为false
  // reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
  error_message_show: Boolean; // 是否开启接口错误信息展示,默认为true
  code_message_show: Boolean; // 是否开启code不为0时的信息提示, 默认为false
  routeChangeCancel: Boolean; // 开启路由切换时候停止加载
};

function myAxios(axiosConfig: any, customOptions?: Partial<TCustomOptions>, loadingOptions?: any) {
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000,
    // withCredentials: true // send cookies when cross-domain requests
  });

  // 自定义配置
  const custom_options = Object.assign(
    {
      repeat_request_cancel: false, // 是否开启取消重复请求, 默认为 false [目前会选择最后一个给予回调，取消都是前面的请求]
      screen_loading: false, // 是否开启全屏层效果, 默认为false
      // reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
      error_message_show: true, // 是否开启接口错误信息展示,默认为true
      code_message_show: false, // 是否开启code不为0时的信息提示, 默认为false
      routeChangeCancel: true, // 开启路由切换时候停止加载
    },
    customOptions
  );

  // Request interceptors
  service.interceptors.request.use(
    (config) => {
      // Add X-Access-Token header to every request, you can add other custom headers here
      if (UserModule.token) {
        config.headers["X-Access-Token"] = UserModule.token;
      }
      // console.log(pendingMap);
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 创建loading实例
      if (custom_options.screen_loading) {
        LoadingInstance._count++;
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = Loading.service(loadingOptions);
        }
      }
      return config;
    },
    (error) => {
      console.log("error: ", error);
      Promise.reject(error);
    }
  );

  // Response interceptors
  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      custom_options.screen_loading && closeLoading(custom_options); // 关闭loading
      const res = response.data;
      if (res.code !== 20000) {
        Message({
          message: res.message || "Error",
          type: "error",
          duration: 5 * 1000,
        });
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录", "确定登出", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            UserModule.ResetToken();
            location.reload(); // To prevent bugs from vue-router
          });
        }
        return Promise.reject(new Error(res.message || "Error"));
      } else {
        return response.data;
      }
    },
    (error) => {
      // const _isRemove = removePending(error.config);
      // if (!_isRemove) {
      //   Message({
      //     message: error.message,
      //     type: "error",
      //     duration: 5 * 1000,
      //   });
      // }
      if (axios.isCancel(error)) return console.error("请求的重复请求：" + error.message);
      custom_options.screen_loading && closeLoading(custom_options); // 关闭loading
      error.config && removePending(error.config);
      return Promise.reject(error);
    }
  );

  return service(axiosConfig);
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options: any) {
  if (_options.screen_loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config: any) {
  const pendingKey = _getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: any) {
  const pendingKey = _getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function _getPendingKey(config: any) {
  const { url, method, params } = config;
  let { data } = config;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

export default myAxios;
