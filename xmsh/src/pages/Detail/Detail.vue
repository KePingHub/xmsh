<template>
	<div class="detail">
		<div class="top-btn">
			<span id="goBack" class="goods-back" @click="goBack">
				<i class="fa-back"></i>
			</span>
			<router-link id="goHome" class="goods-back-home" to="/">
				<i class="fa-home"></i>
			</router-link>
		</div>

		<div class="detail-banner">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="(item, index) in goodsPhotos" key="index">
			  	<img :src="item.url" alt="">
			  </mt-swipe-item>
			</mt-swipe>	
		</div>

		<div class="goods-detail-des goods-pd-both">
			<div class="goods-des-text">
				<p class="nowrap">{{goodInfo.goods_name}}</p>
			</div>
			<div class="goods-des-price">
				<p class="goods-price-now">
					<span class="original-price">￥
						<span class="J_goods-price">{{goodInfo.goods_current_price}}</span>
					</span>
					<span class="goods-price-before">
						<del>￥{{goodInfo.goods_price}}</del>
					</span>
				</p>
			</div>
			<div class="goods-sold-show">
				已售
				<span>{{goodInfo.goods_salenum}}</span>
				份
			</div>
		</div>

		<div class="goods-choice-size goods-pd-both" @click="changeShadeShow">
			<a href="javascript:void(0);" class="goods-dis-detail">
				<span class="goods-dis-text nowrap" v-if="!isCountConfirm">选择&nbsp;数量</span>
				<span class="goods-dis-text nowrap" v-else>已选: {{buyNum}}件;</span>
				<i class="pull-right fa-anger-right"></i>
			</a>
		</div>

		<div class="goods-self-sail">
			<a href="" class="goods-self-content">
				<span class="self-img-box">
					<img src="" alt="">
				</span>
				<span class="self-text-box nowrap">星美生活自营</span>
				<i class="fa-anger-right self-top-position pull-right"></i>
			</a>
		</div>
		<!-- 评论 -->
		<div class="goods-evaluate">
			<ul class="goods-evaluate-list">
				<li class="goods-evaluate-current">
					<a>
						<span>好评</span>
						<br>
						<span>0%</span>	
					</a>
				</li>
				<li>
					<a>
						<span>中评</span>
						<br>
						<span>0%</span>	
					</a>
				</li>
				<li>
					<a>
						<span>差评</span>
						<br>
						<span>0%</span>	
					</a>
				</li>
			</ul>
			<div class="goods-evaluate-content">
				<div class="goods-evaluate-item"></div>
				<div class="all-evaluate">
					<a href="">查看全部评价</a>
				</div>
			</div>
		</div>
		<!-- 商品简介 -->
		<div id="goods-introduce" class="goods-introduce-box"></div>
		<!-- 底部导航 -->
		<div class="bottom-nav">
			<span class="goods-collect icon" :class="{'collected': isCollected}" @click="changeCollect">收藏</span>
			<span class="goods-cart icon">
				<span class="cart-num">{{totalCount}}</span>
				购物车
			</span>
			<span class="add-cart goods-buy" @click="addToCart">加入购物车</span>
			<span class="buy-now goods-buy">立即购买</span>
		</div>

		<div class="choice-num-shade"  v-if="isShadeShow">
			<div class="choice-wrap">
				<div class="goods-info">
					<div class="goods-img-wrap">
						<img :src="goodInfo.main_pic_url" alt="">
					</div>
					<div class="goods-stock-wrap">
						<p class="goods-price">￥{{goodInfo.goods_current_price}}</p>
						<p>库存： {{goodInfo.goods_inventory}}</p>
						<p>选择: 数量</p>
					</div>
				</div>
				<div class="buy-num">
					<span class="buy-num-text">购买数量</span>
					<span class="buy-num-r">
						<span class="reduce-btn" @click="dec">-</span>
						<input id="inputEle" class="num-input" type="number" v-model="buyNum" @input="inputChange">
						<span class="add-btn" @click="inc">+</span>
					</span>
				</div>
				<div class="confirm-btn" @click="countConfirm">确 认</div>
				<span class="close-btn" @click="changeShadeShow"></span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		created() {
			// 隐藏tabBar
			this.$store.commit("CHANGE_TABBAR", false)
			this.$store.dispatch("getAllDetailData", this.$route.params.goodsId)

			// let goodInfoUrl = "http://m.smi170.com/api/mall/good/getGoodInfo/"
			// let GoodsIntroduceUrl = "http://m.smi170.com/api/mall/good/getGoodsIntroduce"
			// let goodsId = this.$route.params.goodsId
			// let fd = new FormData()
			// fd.append("goodsId", goodsId)
			// this.$http.post(goodInfoUrl, fd)
			// .then(res => {
			// 	console.log(res.data.entity);
			// 	this.goodInfo = res.data.entity
			// })

			// this.$http.post(GoodsIntroduceUrl, fd)
			// .then(res => {
			// 	console.log(res.data.entity)
			// 	this.goodsIntroduce = res.data.entity.goodsDetailsMobile
			// })

		},
		data() {
			return {
				// 所有商品详情数据
				// goodInfo: {},
				// 商品介绍数据
				// goodsIntroduce: "",
				// 商品介绍的box节点
				goodsIntroduceBox: null,
				// 选择数量是否显示
				isShadeShow: false,
				// 购买数量
				buyNum: 1,
				// 购买数量是否确定
				isCountConfirm: false,
				// input节点
				inputNode: null
			}
		},
		methods: {
			// 返回上一个页面
			goBack() {
				this.$router.go(-1)
			},
			// 切换选择数量显示隐藏
			changeShadeShow() {
				this.isShadeShow = !this.isShadeShow
			},
			// 数量的确定
			countConfirm () {
				this.isCountConfirm = true
				this.changeShadeShow()
			},
			// 数量增加
			inc () {
				let count = this.buyNum
				this.buyNum = count + 1 > this.goodInfo.goods_inventory ? count : ++count
			},
			// 数量减少
			dec () {
				let count = this.buyNum
				this.buyNum = count <= 1 ? 1 : --count
			},
			// 添加至购物车
			addToCart () {
				if (!this.isCountConfirm) {
					this.changeShadeShow()
					return
				}
				if (this.buyNum >= this.goodInfo.goods_inventory - this.cartCount) {return
				}
				let info = this.goodInfo
				let obj = {}

				// activityStatus:0
				// cartType:null
				// count:3
				// fSaleType: 0
				// goodId: 40550
				// goodName: "B.Toys/比乐 震动校巴"
				// goodPicUrl: "http://img.xingmeihui.com/upload/system/self_goods/4023eb35-8fd1-46dc-93dd-8a1dea773554.jpg_small.jpg"
				// goodPrice: "259.00"
				// goodsDetailUrl: "http://m.smi170.com/#/GoodsDetails/40550"
				// goodsSpec: []
				// groupBuy: 0
				// gspIds: ""
				// iconUrl: null
				// id: 56317
				// inventoryCount: 3
				// seckillBuy: 0
				// totalPrice: "777.00"
				obj.selected = true
				obj.count = this.buyNum
				obj.goodId =  info.goods_id
				obj.goodName = info.goods_name
				obj.goodPrice = info.goods_current_price
				obj.goodPicUrl = info.main_pic_url
				obj.inventoryCount = info.goods_inventory
				obj.totalPrice = this.buyNum * info.goods_current_price
				this.$store.dispatch("cartAdd", obj)
			},
			// input事件处理函数
			inputChange (e) {
				this.inputNode = e.currentTarget
				let currentValue = e.currentTarget.value
				if (currentValue === "") return

				let inventory = this.goodInfo.goods_inventory
			// 从input的value中提取所有非0开头的数字
				let arr = currentValue.match(/^[1-9]\d*/g)
				this.buyNum = arr === null ?  1 : parseInt(arr.join("")) > inventory ? inventory : parseInt(arr.join(""))
			},
			// 更改收藏状态
			changeCollect () {
				let info = this.goodInfo
				let obj = {}
				obj.goodId =  info.goods_id
				obj.goodName = info.goods_name
				obj.goodPrice = info.goods_current_price
				obj.goodPicUrl = info.main_pic_url
				obj.inventoryCount = info.goods_inventory
				this.$store.dispatch("changeCollect", obj)
			}
		},
		computed: {
			// 商品详情数据
			goodInfo () {
				return this.$store.state.goodInfo
			},
			// 商品详情介绍
			goodsIntroduce () {
				return this.$store.state.goodsIntroduce
			},
			// 详情页中轮播图图片
			goodsPhotos() {
				let info = this.goodInfo
				if(info.goods_photos === undefined) return []
				if(info.goods_photos.length === 0) {
					let photos = []
					photos.push({"url": info.main_pic_url})
					return photos
				}
				return info.goods_photos
			},
			// 购物车商品总数
			totalCount () {
				return this.$store.getters.totalCount
			},
			// 购物车的该商品数量
			cartCount () {
				return this.$store.getters.getCountById(this.goodInfo.goods_id)
			},
			isCollected () {
				if (!this.$store.getters.getCollectById(this.goodInfo.goods_id)) {
					return false
				}
				return true
			}
		},
		watch: {
			// 监听商品介绍数据的状态，一旦改变则将数据渲染到页面中
			goodsIntroduce: function () {
				this.goodsIntroduceBox.innerHTML = this.goodsIntroduce
			},
			// input失去焦点value为空时赋值为1
			inputNode: function () {
				this.inputNode.onblur = () => {
					if (this.buyNum === "") {
						this.buyNum = 1
					}
				}
			}
		},
		mounted() {
			// 获取商品介绍内容的box节点
			this.goodsIntroduceBox = document.getElementById("goods-introduce")
		}
	}
</script>
<style scoped>
	.nowrap{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.goods-pd-both{
	    margin-bottom: 10px;
	    background-color: #fff;
	    overflow: hidden;
	}
	.detail-banner{
		width: 100%;
		height: 3.2rem;
	}
	.detail-banner>.mint-swipe{
		height: 100%;
	}
	img{
		max-width: 100%;
	}
	.goods-des-text{
		padding: .05rem 0 .05rem .15rem;
	}
	.goods-des-text>p{
		color: #ff6300;
		font-size: .13rem;
		margin: .077rem 0 .042rem;
		width: 95%;
		float: left;
		line-height: .19rem;
	}
	.goods-des-price{
		padding: .05rem 0 .08rem .15rem;
		line-height: .2rem;
		width: 50%;
		float: left;
	}
	.goods-price-now{
		color: #ff6300;
		font-size: .13rem;
	}
	.goods-price-now>.original-price{
		font-weight: 700;
	}
	.J_goods-price{
		font-size: .16rem;
	}
	.goods-price-before{
		padding-left: .1rem;
		text-decoration: line-through;
	}
	.goods-price-before del{
		color: #999;
		font-size: .11rem;
	}
	.goods-sold-show{
		font-family: Arial;
		width: 30%;
		text-align: right;
		float: right;
		margin-top: .08rem;
		padding-right: .15rem;
		color: #9f9f9f;
	}
	.goods-sold-show span{
		text-align: justify;
	}
	.goods-dis-detail{
		display: block;
		height: .46rem;
		padding: 0 .15rem;
	}
	.goods-dis-text{
		width: 77%;
		margin-top: .13rem;
		color: #333;
	}
	.goods-dis-text{
		display: inline-block;
		height: .21rem;
		line-height: .21rem;
		float: left;
	}
	.pull-right{
		float: right;
	}
	.fa-anger-right{
		position: relative;
	}
	.fa-anger-right:after{
		position: absolute;
		right: .02rem;
		top: .18rem;
		content: "";
		display: inline-block;
		width: .09rem;
		height: .09rem;
		border-right: .01rem solid #949494;
		border-bottom: .01rem solid #949494;
		transform: rotate(-45deg);
	}
	.goods-self-sail{
		background-color: #fff;
	}
	.goods-self-content{
		height: .55rem;
		padding: 0 .15rem;
		display: block;
	}
	.self-img-box{
		float: left;
		display: block;
		width: 24%;
		margin: .13rem 0 .09rem;
	}
	.self-img-box img{
		max-width: 100%;
		width: 100%;
	}
	.self-text-box{
	    float: left;
	    width: 71%;
	    margin-top: 14px;
	    margin-left: 5%;
	    line-height: 35px;
	    color: #000;
	}
	i.self-top-position{
		top: .08rem;
	}
	.pull-right{
		float: right;
	}

	.goods-evaluate{
		float: left;
		width: 100%;
		margin-bottom: .1rem;
		margin-top: .01rem;
		background-color: #fff;
	}
	.goods-evaluate-list{
		border-top: .01rem solid #eaeaea;
		border-bottom: .01rem solid #eaeaea;
		display: -webkit-box;
		display: box;
	}
	.goods-evaluate-list li{
		box-flex: 1;
		width: 33.3%;
		text-align: center;
	}
	.goods-evaluate-list li a:first-of-type, .goods-evaluate-list li a:nth-of-type(2){
		border-right: .01rem solid #eaeaea;
	}
	.goods-evaluate-list li a{
		position: relative;
		display: block;
		height: 100%;
		padding: .1rem 0;
	}
	.goods-evaluate-current a{
		color: #ff6300;
	}
	.goods-evaluate span:first-of-type {
	    display: inline-block;
	    width: 100%;
	    padding-top: 3px;
	}
	.all-evaluate{
		margin-top: -0.01rem;
		border-top: .01px solid #e6e6e6;
		padding: .1rem 0;
	}
	.all-evaluate a{
		display: block;
		width: 38%;
		color: #323232;
		border: .01rem solid #ff914c;
		border-radius: .03rem;
		text-align: center;
		padding: .06rem .1rem;
		margin: 0 auto;
	}
	.goods-introduce-box {
	    background-color: #fff;
	    padding: .08rem .15rem .44rem;
	    line-height: .22rem;
	    max-width: 100%;
	    overflow: hidden;
	}
	.goods-back, .goods-back-home{
		position: fixed;
		top: .03rem;
		z-index: 20;
		width: .375rem;
		height: .375rem;
	}
	.goods-back{
		left: .03rem;
	}
	.goods-back-home{
		right: .03rem;
		text-align: right;
	}
	.goods-back i{
		display: inline-block;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .5);
		position: relative;
		width: .256rem;
		height: .256rem;
		margin: .004rem;
	}
	.goods-back i:after {
	    content: "";
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    width: .085rem;
	    height: .085rem;
	    border-left: .01rem solid #fff;
	    border-bottom: .01rem solid #fff;
	    transform: translate(-30%,-50%) rotate(45deg);
	}
	.goods-back-home i{
		display: inline-block;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .5);
		background-image: url("./images/home.png");
		background-size: 65% 65%;
		background-repeat: no-repeat;
		background-position: 50%;
		width: .256rem;
		height: .256rem;
	}
	.bottom-nav{
		height: .408rem;
		width: 100%;
		background-color: #fff;
		border-top: .01rem solid #dedede;
		z-index: 66;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.bottom-nav>span{
		display: inline-block;
		float: left;
		height: 100%;
		text-align: center
	}
	.bottom-nav>.icon{
		width: 17%;
		padding-top: .21rem;
		background-repeat: no-repeat;
		background-size: .17rem .17rem;
		background-position: center .038rem;
	}
	.goods-collect{
		background-image: url("./images/collect.png");
	}
	.goods-collect.collected{
		background-image: url("./images/collected.png");
	}
	.goods-cart{
		position: relative;
		background-image: url("./images/cart.png");
	}
	.goods-cart .cart-num{
		background-color: #ff6300;
		position: absolute;
		top: .015rem;
		right: .03rem;
		color: #fff;
		font-size: .1rem;
		border-radius: .15rem;
		padding: 0 .05rem;
		line-height: .15rem;
	}
	.bottom-nav>.icon:first-child{
		box-sizing: border-box;
		border-right: .01rem solid #dedede;
	}
	.goods-buy{
		line-height: .408rem;
		color: #fff;
		font-size: .13rem;
	}
	.add-cart{
		width: 34%;
		background-color: #f6a623;
	}
	.buy-now{
		width: 32%;
		background-color: #ff6300;
	}

	.choice-num-shade{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 999;
	}
	.choice-wrap{
		height: 1.79rem;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #fff;
		width: 100%;
	}
	.goods-info{
		padding-bottom: .153rem;
		border-bottom: .01rem solid #f4f4f4;
	}
	.goods-img-wrap{
		float: left;
		width: .833rem;
		height: .833rem;
		margin: -.213rem .136rem 0;
		background-color: #fff;
		border-radius: .05rem;
		border: .01rem solid #f3f5f7;
	}
	.goods-img-wrap>img{
		width: 100%;
		height: 100%;
	}
	.goods-info .goods-stock-wrap .goods-price{
		font-size: .15rem;
		color: #ff6503;
		font-weight: 700;
		padding: .051rem 0 .021rem;
	}
	.goods-stock-wrap p{
		color: #a4a4a4;
	}

	.buy-num{
		height: .256rem;
		padding: .153rem .17rem;
		padding-right: .17rem;
	}
	.buy-num>span{
		display: inline-block;
		line-height: .256rem;
		height: 100%;
	}
	.buy-num-text{
		font-size: .14rem;
	}
	.buy-num-r{
		float: right;
	}
	.buy-num-r>span{
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
	.buy-num-r .reduce-btn{
		border-radius: .03rem 0 0 .03rem;
	}
	.buy-num-r .add-btn{
		border-radius: 0 .03rem .03rem 0;
	}
	.buy-num-r .num-input{
		float: left;
		width: .341rem;
		height: 100%;
		font-size: .12rem;
		border: .01rem solid #ccc;
		border-left: none;
		border-right: none;
		color: #393939;
		text-align: center;
		outline: none;
		box-sizing: border-box;
	}
	.confirm-btn{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		line-height: .408rem;
		text-align: center;
		font-size: .15rem;
		background-color: #ff6300;
		color: #fff;
	}
	.close-btn{
		position: absolute;
		top: .085rem;
		right: .15rem;
		width: .221rem;
		height: .221rem;
		font-size: .15rem;
		color: #fff;
		text-align: center;
		background: #ccc url("./images/close.png") no-repeat 50%;
		background-size: .221rem .221rem;
		border-radius: 50%;
		z-index: 666;
	}
</style>