import http from 'axios' 
import api from '@/api/index'
export default {
	// 获取分类列表
	getClassifyList ({commit}, classId="") {
		let url = api.host + "api/mall/good/getClassList"
		let fd = new FormData()
		fd.append("classId", classId)

		http.post(url, fd)
		.then(res => {
			this.commit("SAVE_CLASSIFY_LIST", res.data.entity)
		})
	},
	// 获取分类产品
	getClassifyGoods ({commit}, obj) {
		let url = api.host + "api/mall/good/getClassGoods"
		let fd = new FormData()
		console.log(obj.classId)
		// classId 分类ID
		fd.append("classId", obj.classId)
		// pageSize 一页多少数据
		fd.append("pageSize", obj.pageSize)
		// 排序方式
		fd.append("sortType", obj.sortType)
		// 升降排序
		fd.append("orderType", obj.orderType)
		// 当前页
		fd.append("currentPage", obj.currentPage)
		http.post(url, fd)
		.then(res => {
			console.log(res.data)
			this.commit("SAVE_CLASSIFY_GOODS", res.data.entity)
		})
	},
	// 获取详情页数据
	getAllDetailData ({commit}, goodsId) {
		let goodInfoUrl = api.host + "api/mall/good/getGoodInfo/"
		let goodsIntroduceUrl = api.host + "api/mall/good/getGoodsIntroduce"
		let fd = new FormData()
		fd.append("goodsId", goodsId)
		// 并发请求
		http.all([http.post(goodInfoUrl, fd), http.post(goodsIntroduceUrl, fd)])
		.then(http.spread((info,introduce) => {
			commit("SAVE_GOODINFO", info.data.entity)
			commit("SAVE_GOODSINTRODUCE", introduce.data.entity.goodsDetailsMobile)
		}))
	},
	//获取购物车数据 
	getCartGoods ({commit}, userId) {
		let url = "/api/carts"
		http.get(url)
		.then(res => {
			console.log(res.data)
			commit("SAVE_CART_GOODS", res.data)
		}) 
	},
	// 获取收藏数据
	getCollects ({commit}) {
		let url = "/api/collects"
		http.get(url)
		.then(res => {
			commit("SAVE_COLLECTS", res.data)
		})
	},
	// 添加商品到购物车
	cartAdd ({commit, state}, obj) {
		let url = "/api/carts"
		let carts = state.cartGoods
		let exist = false
		// 判断购物车里是否有该商品
		for (let ele of carts) {
			if (ele.goodId === obj.goodId) {
				obj.count += ele.count
				obj.totalPrice += ele.totalPrice
				obj.id = ele.id
				exist = true
				break
			}
		}
		if (exist) {
			http.put(url + "/" + obj.id, obj)
			.then(res => {
				commit("UPDATE_NUM", res.data)
			})
		} else {
			http.post(url, obj)
			.then(res => {
				commit("CART_ADD", res.data)
			})
		}
	},
	// 从购物车移除
	cartDel ({commit, state}) {
		let carts = state.cartGoods
		let selectedCarts = carts.filter(ele => ele.selected === true)
		for (let ele of selectedCarts) {
			let url = "/api/carts/" + ele.id
			http.delete(url)
			.then(() => {
				commit("CART_DELETE", ele.id)
			})
		}
	},
	// 商品数量增加/减少
	cartIncOrDec ({commit, state}, obj) {
		let id = state.cartGoods.find(ele => ele.goodId === obj.goodId).id
		let url = "/api/carts/" + id
		http.patch(url, obj)
		.then(res => {
			commit("UPDATE_NUM", res.data)
		})
	},
	// 购物车商品选中状态
	selected ({commit}, obj) {
		let url = "/api/carts?goodId=" + obj.goodId
		http.patch(url, {selected: obj.selected})
		.then(res => {
			commit("UPDATE_SELECTED", res.data)
		})
	},
	// 更改收藏的状态
	changeCollect ({commit, state}, obj) {
		let url = "/api/collects"
		let collects = state.collects
		// 收藏列表里是否有该商品
		let exist = false
		for (let ele of collects) {
			if (ele.goodId === obj.goodId) {
				url += "/" + ele.id 
				http.delete(url)
				.then(res => {
					commit("DEL_COLLECT", ele.id)
				})
				exist = true
				break
			}
		}
		if (!exist) {
			http.post(url, obj)
			.then(res => {
				commit("ADD_COLLECT", res.data)
			})
		}
	}
	// 商品数量减少
	// cartDec ({commit}, obj) {
	// 	let url = "api/carts?goodId=" + obj.goodId
	// 	obj.count--
	// 	obj.totalPrice -= obj.goodPrice
	// 	http.patch(url, obj)
	// 	.then(res => {
	// 		commit("UPDATE_NUM", res.data)
	// 	})
	// }
}