<template>
	<div class="cart">
		<header-orange headerTitle="购物车" back="true"></header-orange>
		<div class="cart-content-wrap">
			<ul class="cart-list" id="cartList">
				<li class="cart-list-item" v-for="item in carts">
					<div class="select-btn selected"></div>
					<div class="item-img-wrap">
						<router-link to="">
							<img :src="item.goodPicUrl" alt="">
						</router-link>
					</div>
					<div class="item-info">
						<router-link to="" class="item-name">{{item.goodName}}</router-link>
						<p class="item-standard">
							<span class="standard-text"></span>
							<i v-if="editPageShow" class="standard-options-icon"></i>
						</p>
						<span class="item-price">￥{{item.goodPrice}}</span>
						<span v-show="!editPageShow" class="item-buy-num">x{{item.count}}</span>
						<span v-show="editPageShow" class="item-buy-num edit-num">
							<span class="reduce-btn" @click="dec(item)">-</span>
							<input class="num-input" type="number" :value="item.count" @input="inputChange">
							<span class="add-btn" @focus="goodInfo = item" @click="inc(item)">+</span>
						</span>
					</div>
				</li>
			</ul>

			<div class="cart-pay">
				<div class="all-select">全选</div>
				<span class="balance">
					{{editPageShow ? "删除" : "结算"}}<span class="num-count">(0)</span>
				</span>
				<span class="total" v-show="!editPageShow">
					合计:<span class="total-price">￥0.00</span>
				</span>
			</div>
		</div>
		<span class="edit-btn" @click="edit">{{editPageShow ? "完成" : "编辑"}}</span>
	</div>
</template>

<script>
import HeaderOrange from "@/components/Header-Orange/Header-Orange"
	export default{
		components: {
			HeaderOrange
		},
		created () {
			this.$store.commit("CHANGE_TABBAR", false)
			this.$store.dispatch("getCartGoods")
		},
		data () {
			return {
				// 编辑页面是否显示
				editPageShow: false,
				// 正在修改数量的商品信息
				goodInfo: {},
				// 购物车列表节点
				inputNode: null
			}
		},
		methods: {
			edit () {
				this.editPageShow = !this.editPageShow
			},
			inc (item) {
				let obj = {
					goodId: item.goodId,
					count: ++item.count,
					goodPrice: item.goodPrice,
					totalPrice: item.count * item.goodPrice
				}
				this.$store.dispatch("cartIncOrDec", obj)
			},
			// 数量减少
			dec (item) {
				let obj = {
					goodId: item.goodId,
					count: --item.count,
					goodPrice: item.goodPrice,
					totalPrice: item.count * item.goodPrice
				}
				this.$store.dispatch("cartIncOrDec", obj)
			},
			// input事件处理函数
			// inputChange (e) {
			// 	console.log(arguments)
			// 	this.inputNode = e.currentTarget
			// 	console.log(e.currentTarget);
			// 	let currentValue = e.currentTarget.value
			// 	if (currentValue === "") return

			// 	let inventory = this.goodInfo.inventoryCount
			// // 从input的value中提取所有非0开头的数字
			// 	let arr = currentValue.match(/^[1-9]\d*/g)
			// 	this.buyNum.value = arr === null ?  1 : parseInt(arr.join("")) > inventory ? inventory : parseInt(arr.join(""))
			// },
			// 通过id获取单个数量
			getCountById (id) {
				return this.$store.getters.getCountById(id)
			}
		},
		computed: {
			// 提取购物车数据
			carts () {
				return this.$store.state.cartGoods
			}
		},
		mounted () {
		}
	}
</script>
<style scoped>
	.cart-content-wrap{
		padding-top: .375rem;
		background-color: #eaeaea;
	}
	.cart-list{
		background: #fff;
		margin-bottom: .8rem;
	}
	.cart-list-item{
		height: .843rem;
		width: 98%;
		overflow: hidden;
		padding: .085rem 1%;
		border-bottom: .01rem solid #eaeaea;
	}
	.cart-list-item>div{
		float: left;
		height: 100%;
	}
	.select-btn, .all-select{
		width: .256rem;
		height: 100%;
		position: relative;
	}
	.select-btn:after,
	.all-select:after{
		content: "";
		position: absolute;
		left: .05rem;
		top: 50%;
		margin-top: -.08rem;
		width: .16rem;
		height: .16rem;
		border: .01rem solid #9a9a9a;
		border-radius: 50%;
	}
	.select-btn.selected:after,
	.all-select.selected:after{
		background: #ff6300 url("./images/selected.png") no-repeat center;
		background-size: .16rem .16rem;
		border-color: #ff6300;
	}
	.item-img-wrap{
		width: .85rem;
		height: .85rem;
		margin-right: .1rem;
	}
	.item-img-wrap>a{
		display: block;
		width: 100%;
		height: 100%;
	}
	.item-img-wrap>a>img{
		width: 100%;
		height: 100%;
	}
	.item-info{
		width: 57%;
		position: relative;
	}
	.item-info .item-name{
		color: #333;
		width: 100%;
		line-height: .165rem;
		font-size: .14rem;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.item-info .item-standard{
		width: 100%;
		margin-top: .0426rem;
		position: relative;
	}
	.item-standard .standard-text{
		display: inline-block;
		width: 85%;
		font-size: .12rem;
		color: #999;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.item-standard .standard-options-icon{
		position: absolute;
		right: .03rem;
		top: .02rem;
		width: .084rem;
		height: .084rem;
		border-left: .01rem solid #9e9e9e;
		border-bottom: .01rem solid #9e9e9e;
		transform: rotate(-45deg);
		font-weight: 400;
	}
	.item-price, .item-buy-num{
		position: absolute;
		bottom: 0;
	}
	.item-price{
		left: 0;
		color: #ff6300;
		font-size: .13rem;
	}
	.item-buy-num{
		right: 0;
		font-size: .12rem;
		color: #666;
	}
	.edit-num{
		height: .256rem;
	}
	.edit-num>span{
		float: left;
		height: 100%;
		color: #cdcdcd;
		line-height: .16rem;
		text-align: center;
		padding: .034rem .085rem;
		display: inline-block;
		box-sizing: border-box;
		border: .01rem solid #ccc;
	}
	.edit-num .reduce-btn{
		border-radius: .03rem 0 0 .03rem;
	}
	.edit-num .add-btn{
		border-radius: 0 .03rem .03rem 0;
	}
	.edit-num .num-input{
		float: left;
		font-size: .12rem;
		width: .341rem;
		height: 100%;
		border: .01rem solid #ccc;
		border-left: none;
		border-right: none;
		color: #393939;
		text-align: center;
		outline: none;
		box-sizing: border-box;
	}
	.edit-btn{
		position: fixed;
		right: 0;
		top: 0;
		height: .375rem;
		width: .46rem;
		line-height: .375rem;
		text-align: center;
		color: #fff;
		z-index: 99;
		font-size: .12rem;
	}
	.cart-pay{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 66;
		width: 100%;
		height: .374rem;
		background-color: #fff;
		border-top: .01rem solid #ddd;
		padding-left: .032rem;
	}
	.cart-pay .all-select{
		font-size: .13rem;
		width: .3rem;
		padding-left: .256rem;
		line-height: .375rem;
		float: left;
	}
	.cart-pay>span{
		float: right;
		height: 100%;
		line-height: .374rem;
	}
	.cart-pay .total{
		display: inline-block;
		text-align: right;
		padding-right: .12rem;
		color: #333;
		font-size: .16rem;
	}
	.total .total-price{
		color: #ff6300;
		margin-left: .1rem;
		font-family: Arial,Helvetica,sans-serif;
	}
	.balance{
		display: inline-block;
		text-align: center;
		font-size: .16rem;
		color: #fff;
		background-color: #ff6300;
		padding: 0 .213rem;
	}
</style>