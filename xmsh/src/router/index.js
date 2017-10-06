import Vue from 'vue'
import Router from 'vue-router'
// 主页
import Home from '@/pages/Home/Home'
// 分类
import Category from '@/pages/Category/Category'
// 购物车
import Cart from '@/pages/Cart/Cart'
// 我的
import Mine from '@/pages/Mine/Mine'
// 登录
import Login from '@/pages/Login/Login'
// 详情页
import Detail from '@/pages/Detail/Detail'
// 分类商品列表页
import GoodsList from '@/pages/GoodsList/GoodsList'

Vue.use(Router)

export default new Router({
	mode: "history",
  routes: [
    {
      path: '/',
      component: Home
    },{
    	path: '/category/:classId',
    	component: Category
    },{
    	path: '/cart',
    	component: Cart
    },{
    	path: '/Mine',
    	component: Mine
    },{
    	path: '/login',
    	component: Login
    },{
      path: '/detail/:goodsId',
      component: Detail
    },{
      path: '/GoodsList/class/:classId',
      component: GoodsList
    }
  ]
})
