// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// rem初始化
import Reset from '@/common/reset'
// 导入仓库
import store from './store/index'
// 引入axios
import axios from 'axios'

Vue.prototype.$http = axios

import '@/common/styles/reset.css'
// 引入mint-ui部分
import { Swipe, SwipeItem} from 'mint-ui'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导航钩子,跳转时默认回到顶部
router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0)
	next()
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
