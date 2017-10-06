export default {
	// 购物车总数量
	totalCount (state) {
		let count = 0
		for (let ele of state.cartGoods) {
			count += ele.count
		}
		return count
	},
	// 购无车选中的商品的总价格
	totalPrice (state) {
		let price = 0
		let selectedCarts = state.cartGoods.filter(item => item.selected)
		for (let ele of selectedCarts) {
			price += ele.totalPrice
		}
		return price
	},
	// 全选按钮
	allSelected (state) {
		if (state.cartGoods.length === 0) return false
		for (let ele of state.cartGoods) {
			if (!ele.selected) {
				return false
			}
		}
		return true
	},
	// 获取指定产品id的数量
	getCountById: state => id => state.cartGoods.find(ele => ele.goodId === id).count,
	// 获取制定产品id的收藏状态
	getCollectById: state => id => state.collects.find(ele => ele.goodId === id)
}