<template>
	<div class="goods-list">
		<header-orange headerTitle="商品列表" back="true"></header-orange>
		<div class="goods-content">
			<ul class="sort-type-list clearFix">
				<li class="sort-type-item popularity" :class="{active: fd.sortType === 3}" @click="popularityActive">人气</li>
				<li class="sort-type-item price" :class="{active: fd.sortType === 1, 'up': fd.orderType === 'asc', 'down': fd.orderType === 'desc'}" @click="changeOrderType">价格</li>
				<li class="sort-type-item sales" :class="{active: fd.sortType === 2}" @click="salesActive">销量</li>
			</ul>

			<div class="product-list-wrap">
				<ul class="product-list">
					<li class="product-list-item" v-for=
					"item in classifyGoods">
						<div class="product-img-box">
							<router-link :to="'/detail/' + item.goodId">
								<img :src="item.goodPicUrl" alt="">
							</router-link>
						</div>
						<div class="product-detail">
							<p class="product-text">
								<router-link :to="'/detail/' + item.goodId">{{item.goodName}}</router-link>
							</p>
							<p class="product-price">￥{{item.goodPrice}}</p>
							<span class="product-evaluate-count">{{item.evaluateCount}}人评价</span>
							<span class="product-sale-count">{{item.goodsSalenum}}人已购买</span>
						</div>
					</li>	
				</ul>
			</div>
			<p class="no-more" v-if="!isAnyData">n(*≧▽≦*)n 都被你看光了~</p>
		</div>
	</div>
</template>
<script>
	import HeaderOrange from '@/components/Header-Orange/Header-Orange'
	export default {
		components: {
			HeaderOrange
		},
		data () {
			return {
				// formData实例的数据
				fd: {
					// pageSize 一页多少数据，默认10个
					pageSize: 10,
					// 排序方式 默认为人气排序
					// 3：人气，2：销量，1：价格
					sortType: 3,
					// 当前页，默认第一页
					currentPage: 1,
					// 升降排序, 默认降序
					orderType: "desc",
					// classId 分类ID
					classId: null
				},
				// 有没有数据
				isAnyData: true
			}
		},
		methods: {
			// 人气排序激活
			popularityActive () {
				this.fd.orderType = "desc"
				this.fd.sortType = 3
			},
			// 更改价格升降序
			changeOrderType () {
				this.fd.sortType = 1
				this.fd.orderType = this.fd.orderType === "desc" ? "asc" : "desc"
			},
			// 销量排序激活
			salesActive () {
				this.fd.orderType = "desc"
				this.fd.sortType = 2
			}
		},
		created () {
			this.fd.classId = this.$route.params.classId
			this.$store.commit("CHANGE_TABBAR", false)
		},
		computed: {
			classifyGoods () {
				let goods = this.$store.state.classifyGoods
				if (goods.length !== 0) {
					this.isAnyData = true 
				} else {
					this.isAnyData = false
				}
				return this.$store.state.classifyGoods
			}
		},
		watch: {
			// 监听fd对象属性的变化
			fd: {
				handler () {
					this.$store.dispatch("getClassifyGoods", this.fd)
				},
				deep: true
			}
		}
	}
</script>
<style scoped>
	.clearFix:after{
		content: "";
		display: table;
		clear: both;
	}
	.goods-content{
		padding-top: .375rem;
	}
	.sort-type-list{
		width: 100%;
		height: .4rem;
		background-color: #fff;
	}
	.sort-type-list .sort-type-item{
		float: left;
		width: 33%;
		height: 100%;
		border-right: .01rem solid #ddd;
		border-bottom: .01rem solid #ddd;
		text-align: center;
		line-height: .4rem;
		font-size: .14rem;
		color: #555;
		box-sizing: border-box;
	}
	.sort-type-item.active{
		color: #ff6300;
		border-bottom: .02rem solid #ff6300;
	}
	.sort-type-list .sort-type-item:last-child{
		width: 34%;
		border-right: none;
	}
	.sort-type-list .price{
		position: relative;
	}
	.sort-type-list .price:before,
	.sort-type-list .price:after{
		position: absolute;
		right: 23%;
		content: "";
		width: .05rem;
		height: .05rem;
		border-right: .01rem solid #d7d7d7;
		border-top: .01rem solid #d7d7d7;
	}
	.sort-type-list .price:before{
		top: .16rem;
		transform: rotate(-45deg);
	}
	.sort-type-list .active.up.price:before{
		border-color: #ff6300;
	}
	.sort-type-list .price:after{
		top: .19rem;
		transform: rotate(135deg);
	}
	.sort-type-list .active.down.price:after{
		border-color: #ff6300;
	}

	.product-list-wrap{
		margin-top: .085rem;
		background-color: #f1f5f7;
	}
	.product-list-item{
		width: 50%;
		float: left;
		background-color: #fff;
		border-bottom: .025rem solid #f1f5f7;
		border-right: .025rem solid #f1f5f7;
		box-sizing: border-box;
	}
	.product-list .product-list-item:nth-of-type(2n){
		border-right: none;
	}
	.product-img-box{
		width: 100%;
		height: 1.45rem;
	}
	.product-img-box>a{
		display: block;
		width: 100%;
		height: 100%;
	}
	.product-img-box>a>img{
		width: 100%;
		height: 100%;
	}
	.product-detail{
		padding: 0 .07rem .085rem;
	}
	.product-text{
		font-size: .14rem;
		height: .341rem;
		padding: .042rem 0;
	}
	.product-text>a{
		display: inline-block;
		color: #333;
		height: 100%;
		width: 100%;
		line-height: .17rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.product-price{
		padding: .03rem 0;
		font-size: .15rem;
		color: #ff6300;
	}
	.product-sale-count{
		float: right;
	}
	.no-more{
		padding: .08rem;
		text-align: center;
		color: #999;
	}
</style>