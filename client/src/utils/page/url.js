// 写页面信息例如url参数

/**
 * 获取url参数，参数拼接路径有不同
 * @param targetKey 参数名
 * @returns
 */
export const getUrlParams = (targetKey) => {
  // https://xxx.com/index.html?xxx=xxx
  const urlSearchParams = Object.fromEntries(new URLSearchParams(location.search));
  // 获取链接hash后面的参数 https://xxx.com/index.html#/xxx/xxx?xxx=xxx
  const urlHashParams = Object.fromEntries(new URLSearchParams(location.hash.split('?')[1]));
  // 指定key时，返回对应的值
  if (targetKey) return urlSearchParams[targetKey] || urlHashParams[targetKey] || '';

  return { ...urlSearchParams, ...urlHashParams };
};