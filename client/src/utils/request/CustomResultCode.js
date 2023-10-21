/**
 * 自定义网络请求错误状态码
 * @param code
 */
const CustomResultCode = (code) => {
  switch (code) {
    case 500:
      uni.showToast({
        title: '系统繁忙!',
        icon: 'none'
      })
      break;
  default:
    break;
  }
};

export default CustomResultCode;
