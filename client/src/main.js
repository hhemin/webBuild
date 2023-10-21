import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import '@/styles/index.css';
import * as filters from '@/filters';

Vue.config.productionTip = false

// App.mpType = 'app'
// 注册全局过滤函数
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new App({
  // store,
}).$mount();