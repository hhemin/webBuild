// 判断是否提交全空值【有给予输入空格式哦】
const isEmpty = (value) => {
  if (!value) return true;
  const _v = String(value).split(' ').join('');
  if (_v.length === 0) {
    // 判断是否全输入有空格
    return true;
  }
  return false;
};
// 全局验证
import {
  phoneRegEx
} from '@/utils/regex';

// 手机号是否验证通过
export function isPassVerifyPhone(phone) {
  if (isEmpty(phone)) {
    uni.showToast({
      title: '请输入手机号码！',
      icon: 'none',
    });
    return false;
  }

  if (!phoneRegEx.test(phone)) {
    uni.showToast({
      title: '请输入有效的手机号码！',
      icon: 'none',
    });
    return false;
  }

  return true;
}