<template>
	<div id="home">
		<header class="search-header" :class="{orange: searchBgShow}">
			<div class="search-box">输入商品名，品牌名</div>
		</header>
		<div class="go-top" @click="goTop"></div>
		<main id="content" class="main-content">
			<!-- 轮播图 -->
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="item in navigate.scroller"  key="item.id">
			  	<router-link class="swipe-slide" to="/">
			  		<img :src="item.picUrl" alt="">
			  	</router-link>
			  </mt-swipe-item>
			</mt-swipe>

			<div class="goods-cage-item clearFix">
				<router-link class="cage-item" to="" v-for="item in navigate.navigate" key="item.id">
					<span class="cage-item-img">
						<img :src="item.picUrl" alt="">
					</span>
					<p class="cage-item-text">{{item.title}}</p>
				</router-link>
			</div>
			<!-- 秒杀 -->
			<div class="second-kill" v-if="isSecKillShow">
				<div class="kill-top">
					<span class="kill-text"></span>
					<span class="count-down">
						距结束
						<span>{{hours}}</span>
						:
						<span>{{minutes}}</span>
						:
						<span>{{seconds}}</span>
					</span>
					<a class="more" href="">查看更多</a>
				</div>
				<div class="kill-list">
					<router-link to="" class="list-item" v-for="item in killList" key="item.goods_id">
						<div class="goods-img">
							<img :src="item.seckill_img_url" alt="">
						</div>
						<p class="goods-price">
							<span class="sale-price">￥{{item.seckill_price}}</span>
							<del class="original-price">￥{{item.goods_price}}</del>
						</p>
					</router-link>
				</div>
			</div>

			<div class="choiceness-act index-actcom">
				<h3 class="act-title">
					<span class="act-text">
						精选活动
					</span>
				</h3>
				<div class="act-content">
					<router-link to="/" class="act-fir">
						<img src="./images/jingxuan.jpg" alt="">
					</router-link>
					<div class="act-sec clearFix">
						<router-link class="other-item" to="/">
							<img src="./images/libao.png" alt="">
						</router-link>
						<router-link class="other-item" to="/">
							<img src="./images/libao.png" alt="">
						</router-link>
					</div>
				</div>
			</div>

			<div class="goods-recommend index-actcom">
				<h3 class="act-title">
					<span class="act-text">
						好物推荐
					</span>
				</h3>
				<div class="act-list-wrap">
					<ul id="goodsList" class="goods-list clearFix">
						<li  class="list-item" v-for="item in goodsList" key="item.goodId">
							<router-link class="item-link" :to="'/detail/' + item.goodId">
								<div class="link-img">
									<img :src="item.goodPicUrl" alt="">
								</div>
								<p class="goods-tit nowrap">{{item.goodName}}</p>
								<p class="goods-price">
									<span class="sale-price">￥{{item.goodPrice}}</span>
									<del class="original-price">￥{{item.originalPrice}}</del>
								</p>				
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<p class="no-more" v-if="!isAnyData">n(*≧▽≦*)n 都被你看光了~</p>
		</main>
	</div>
</template>

<script>
	export default{
		created() {
			// 显示tabBar
			this.$store.commit("CHANGE_TABBAR")
			// 秒杀数据
			let seckill = () => {
				let secKillUrl = "http://m.smi170.com/api/mall/seckill/getNewestSeckillFieldInfo"
				this.$http.get(secKillUrl)
				.then(res => {
					// 秒杀活动是否开启
					if (res.data.entity !== null) {
						this.isSecKillShow = true
						this.killList = res.data.entity.list
						this.killTime = res.data.entity.meta.remainTime
						let _this = this
						let timer = setInterval(function () {
							_this.killTime--
							if (_this.killTime == 0) {
								seckill()
							}
						}, 900)	
					} else {
						this.isSecKillShow = false
					}
				})
			}
			seckill()

			// 轮播图及轮播图底部数据
			let navigateUrl = "http://m.smi170.com/api/mall/channel/getIndexNavigate"
			this.$http.get(navigateUrl)
			.then(res => {
				this.navigate = res.data.entity
			})
			// 好物推荐
			this.getGoodsList()
		},
		data() {
			return {
				scrollEle: null,
				// 头部橙色背景是否展示
				searchBgShow: false,
				// 秒杀活动是否存在
				isSecKillShow: true,
				// 秒杀列表
				killList: [],
				// 秒杀时间
				killTime: 0,
				// banner
				navigate: {},
				// 好物推荐
				goodsList: [],
				// 分页请求 传递FormData实例数据
				obj: {
					currentPage: 1,
					pageSize: 10
				},
				// 判断服务器是否还有分页数据
				isAnyData: true
			}
		},
		methods: {
			// 回到顶部
			goTop() {
				let distance = this.scrollEle.scrollTop
				let _this = this
				let speed = 40
				let raf = requestAnimationFrame(function step() {
					distance -= speed
					distance = distance >= speed ? distance : 0
					_this.scrollEle.scrollTop = distance
					if (distance === 0) {
						cancelAnimationFrame(raf)
					} else {
						requestAnimationFrame(step)
					}
				})
			},
			// 获取好物推荐列表
			getGoodsList(cb) {
				let goodsRecommendUrl = "http://m.smi170.com/api/mall/user/getMyLikesByParam"
				let fd = new FormData()
				let obj = this.obj
				fd.append("currentPage", obj.currentPage)
				fd.append("pageSize", obj.pageSize)
				this.$http.post(goodsRecommendUrl, fd)
				.then(res => {
					let list = res.data.entity.list
					this.goodsList = this.goodsList.concat(list)
					if(list.length === 0) {
						this.isAnyData = false
					}
				})
			}
		},
		computed: {
			// 秒杀倒计时
			hours() {
				let hour = parseInt(this.killTime / 3600)
				return hour > 9 ? hour : "0" + hour
			},
			minutes() {
				let minute = parseInt((this.killTime - this.hours * 3600) / 60)
				return minute > 9 ? minute : "0" + minute
			},
			seconds() {
				let second = this.killTime % 60
				return second > 9 ? second : "0" + second
			}
		},
		mounted() {
			let body = document.body
			let scrollEle = document.documentElement
			let goodsList = document.getElementById("goodsList")
			// 浏览器可视化的高度
			let clientH = scrollEle.clientHeight || window.innerHeight || body.clientHeight
			this.scrollEle = scrollEle
			// 监听滚动事件
			body.onscroll = () => {
				requestAnimationFrame(() => {
					let scrollTop = scrollEle.scrollTop
					// 动态更改显示隐藏头部背景
					this.searchBgShow = scrollTop > 0 ? true : false
					// 滚动至底部时，动态请求分页数据
					if (scrollTop === scrollEle.scrollHeight - clientH && this.isAnyData) {
						this.obj.currentPage++
						this.getGoodsList()
					}
				})
			}
		}
	}
</script>
<style>
	.clearFix:after{
		content: "";
		display: table;
		clear: both;
	}
	.nowrap{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	#home{
		width: 100%;
		height: 100%;
		padding-bottom: .41rem;
		overflow-y: scroll;		 
	}
	.go-top{
		position: fixed;
		bottom: .64rem;
		right: .043rem;
		z-index: 999;
		width: .42rem;
		height: .42rem;
		background: url("./images/gotop.png") no-repeat;
		background-size: .42rem .42rem;
	}
	/*搜索框*/
	.search-header{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		padding: .064rem 0;
		background: rgba(0, 0, 0, 0);
	}
	.search-header.orange{
		background: #ff6300;
	}
	.search-box{
		text-align: left;
		width: 70%;
		margin: 0 auto;
		border-radius: .2rem;
		background-color: #fff;
		font-size: .12rem;
		padding: .068rem .324rem;
		color: #ababab;
		position: relative;
	}
	.search-box:before{
		content: "";
		position: absolute;
		left: .12rem;
		top: 50%;
		margin-top: -0.068rem;
		width: .136rem;
		height: .136rem;
		background: url("./images/search-btn.png") no-repeat center;
		background-size: .136rem .136rem;
	}
	/*banner轮播图*/
	.main-content{
		margin-bottom: .12rem;
	}
	.mint-swipe{
		height: 1.79rem;
		width: 100%;
	}
	.mint-swipe-indicator{
		border: .001rem solid #fff;
		opacity: .8;
		background-color: #ebebeb;
		filter: alpha(opacity=80);
	}
	.mint-swipe-indicator.is-active{
		background-color: #ff6300;
	}
	.swipe-slide{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.swipe-slide > img{
		width: 100%;
		height: 100%;
	}
	/*banner底部*/
	.goods-cage-item{
		padding-top: .128rem;
		width: 100%;
		min-height: 1.26rem;
		background-color: #fff;
	}
	.cage-item{
		float: left;
		width: 25%;
		text-align: center;
		text-decoration: none;
		margin-bottom: .128rem;
	}
	.cage-item .cage-item-img{
		display: inline-block;
		width: .384rem;
		height: .384rem;
	}
	.cage-item .cage-item-img > img{
		width: 100%;
		height: 100%;
	}
	.cage-item .cage-item-text{
		font-size: .12rem;
		color: #333;
		padding-top: .042rem;
	}

	/*秒杀*/
	.second-kill{
		margin-top: .064rem;
		background-color: #fff;
	}
	.kill-top{
		padding: .128rem;
		color: #333;
	}
	.kill-top .kill-text{
		position: relative;
	}
	.kill-top .kill-text:before{
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 1rem;
		height: .3rem;
		background: url("./images/xingmeisecondkill.png") no-repeat;
		background-size: .9rem auto;
	}
	.kill-top .count-down{
		display: inline-block;
		color: #ababab;
		padding-left: .938rem;
		vertical-align: middle;
		margin-bottom: -0.021rem;
	}
	.count-down span{
		color: #fff;
		font-size: .1rem;
		background-color: #ef5830;
		border-radius: .04rem;
		display: inline-block;
		padding: .0034rem .0256rem;
	}
	.kill-top .more{
		float: right;
		color: #999;
		padding-right: .17rem;
		margin-top: .025rem;
		background: url("./images/more.png") no-repeat right center;
		background-size: .136rem .136rem;
	}
	.kill-list{
		width: auto;
		overflow-x: scroll;
		white-space: nowrap; 
	}
	.kill-list::-webkit-scrollbar{
		display:none;
	}
	.kill-list .list-item{
		display: inline-block;
		padding: .1rem;
		width: .734rem;
		height: 1.16rem;
	}
	.list-item .goods-img{
		width: .734rem;
		height: .748rem;
		margin-bottom: .1rem;
	}
	.list-item .goods-img > img{
		width: 100%;
		height: 100%;
	}
	.list-item .goods-price{
		text-align: center;
	}
	.list-item .goods-price .sale-price{
		color: #ff6300;
		font-weight: 700;
		font-size: .12rem;
		display: block;
	}
	.list-item .goods-price .original-price{
		color: #ccc;
		font-size: .1rem;
		display: block;
	}
	
	/*精选活动*/
	.index-actcom .act-title{
		text-align: center;
		background-color: #f3f5f7;
		color: #464646;
		padding: .119rem 0;
		font-size: .13rem;	
	}
	.act-title .act-text{
		display: inline-block;
		padding-left: .18rem;
		background: url("./images/act-ico.png") no-repeat left center;
		background-size: .128rem .128rem;
	}
	.act-fir{
		display: block;
		padding: 0 .042rem .042rem;
		background-color: #f3f5f7;
		width: auto;
	}
	.act-fir>img{
		width: 100%;
	}
	.act-sec{
		width: 100%;
		overflow: hidden;
		border-bottom: .01rem solid #f3f3f4;
	}
	.act-sec .other-item{
		height: 1.024rem;
		width: 50%;
		border-left: .01rem solid #f3f3f4;
		display: block;
		float: left;
		box-sizing: border-box;
	}
	.act-sec .other-item:first-child{
		border-left: none;
	}
	.act-sec .other-item > img{
		width: 100%;
	}

	/*好物推荐列表*/
	.goods-list .list-item{
		width: 50%;
		float: left;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		border-left: .025rem solid #f1f5f7;
		border-bottom: .025rem solid #f1f5f7;
		background-color: #fff;
		height: 2.257rem;
	}
	.goods-list .list-item:nth-child(2n-1){
		border-left: none;
	}
	.list-item .item-link{
		display: block;
		width: 100%;
		height: 100%;
	}
	.item-link .link-img{
		height: 1.45rem;
	}
	.link-img > img{
		width: 100%;
		height: 100%;
	}
	.item-link .goods-tit{
		color: #333;
		font-size: .14rem;
		padding: .05rem .08rem 0;
		font-weight: 400;
		line-height: .26rem;
	}
	.item-link .goods-price{
		margin-top: .15rem;
		padding-left: .08rem;
		text-align: left;
	}
	.item-link .goods-price .sale-price{
		color: #f0452b;
		font-size: .15rem;
		padding-right: .051rem;
		font-weight: normal;
		display: inline-block;
	}
	.item-link .goods-price .original-price{
		color: #ccc;
		font-size: .11rem;
		display: inline-block;
	}
	
	.no-more{
		padding: .08rem;
		text-align: center;
		color: #999;
	}
</style>