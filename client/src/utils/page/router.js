const RouterMap = {
  home: "/",
  my:'/pages/my/index/index',
};

// 参数直接跳转
export const JumpRouter = (key) => {
  if(!RouterMap[key]) return new Error('没有这个参数哦～')
  uni.navigateTo({
    url: RouterMap[key],
  });
}
