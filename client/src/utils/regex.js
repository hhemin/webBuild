// 手机号 13、14、15、16、17、18、19开头即可
export const phoneRegEx = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

//邮政编码 开头不能为0，共6位
export const postalRegEx = /^[0-9]{6}$/;