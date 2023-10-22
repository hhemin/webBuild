# webBuild

## 开发前版本控制
```
1、nodejs 版本
  其中版本管理器有nvm（win推荐）、n（mac可用）
2、git、svn等等
  语法：feat: 新增、fix:解决了XXX bug、style: 修改了样式
  git建议可以用码云来使用，网络稳定，管理工具也可以用Sourcetree软件或者vscode 安装好git 插件
3、学会写md文档
```
## 项目UI框架选择
```
1、uview-ui
2、NutUI （京东）
```
## 开发环境配置那些
```
1、env 文件编辑创建开发环境变量
  env 全局、.env.development 开发时候环境（本地运行，默认运行）、.env.production 正式环境（打包时候默认运行）
2、plop 创建模板
3、css 模块化、变量
```
## 网络请求模块
跨域：建议后端解决
## 开发
```
1、全局方法
  例如：个人信息API请求、URL参数获取
2、全局属性
  例如：个人信息保存、定位信息
3、权限问题
  可写成指令方式、方法函数判断等等
  指令可以看：back > directives的permission文件 v-permission
  可以例如 <div v-permission="['admin']"></div> // 当当前用户是admin 则就显示出来
4、过滤器
5、Hook（vue3） minxi(vue2)
  主要：封装页面逻辑模块
6、前后端交流方面
  1、数据返回格式固定
  例如选项:[{value:1,label:'java'},{value:2,label:'web'}] value 要不能重复
  2、列表数据返回格式统一
  {
    code:200,// 返回状态
    msg:'成功',// 返回信息
    data:{
      count:0,// 数据总数
      items:[]
    },// 数据
  }
  3、数据字典
  例如："发现“>"专业"，可以通过添加字典模式处理 [{value:'1',label:"软件技术"}] or [{id:1,name:"软件技术"}] To 框架标准格式化
  还有更多等等。。。
```

## 组件可分为
UI组件 （单纯写界面样式）
逻辑组件 （例如定位按钮，主要涉及处理逻辑、请求接口等等）

## 文件
client 客户端
back 管理后台 （里面svg 处理、hook写法、ts写法、vue2采用用vue3写法可以参考）

## 代码运行

back node版本 >=12 && <=16