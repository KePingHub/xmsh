export default {
	// 更改tabBar显示隐藏状态
	CHANGE_TABBAR (state, showBol=true) {
		state.tabBarShow = showBol
	},
	// 保存分类列表数据到vuex
	SAVE_CLASSIFY_LIST (state, data) {
		state.classifyList = data
	},
	// 保存分类商品数据到vuex
	SAVE_CLASSIFY_GOODS (state, data) {
		if (data.currentPage === 1) {
			state.classifyGoods = []
		}
		state.classifyGoods = state.classifyGoods.concat(data.list)
	},
	// 保存商品详情页数据到vuex
	SAVE_GOODINFO (state, data) {
		state.goodInfo = data
	},
	// 保存商品详情页介绍数据到vuex
	SAVE_GOODSINTRODUCE (state, data) {
		state.goodsIntroduce = data
	},
	// 保存购物车商品数据到vuex
	SAVE_CART_GOODS (state, data) {
		state.cartGoods = data
	},
	// 保存收藏数据到vuex
	SAVE_COLLECTS (state, data) {
		state.collects = data
	},
	// 更新本地购物车商品数量
	UPDATE_NUM (state, data) {
		let carts = state.cartGoods
		for (let ele of carts) {
			if (ele.goodId === data.goodId) {
				ele.count = data.count
				ele.totalPrice = data.totalPrice
				break
			}
		}
	},
	// 添加vuex购物车商品
	CART_ADD (state, data) {
		state.cartGoods.push(data)
	},
	// 删除vuex购物车商品
	CART_DELETE (state, data) {
		let carts = state.cartGoods
		carts.splice(carts.findIndex(ele => ele.goodId === data.goodId), 1)
	},
	// 更新vuex购物车商品选中状态
	UPDATE_SELECTED (state, data) {
		state.cartGoods.find(ele => ele.goodId === data.goodId).selected = data.selected
	},
	// 添加收藏
	ADD_COLLECT (state, data) {
		state.collects.push(data)
	},
	// 取消收藏
	DEL_COLLECT (state, data) {
		let collects = state.collects
		collects.splice(collects.findIndex(ele => ele.goodId === data.goodId), 1)
	}
}