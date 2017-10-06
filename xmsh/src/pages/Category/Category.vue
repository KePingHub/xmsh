<template>
	<div class="category">
		<header-orange headerTitle="商品分类" back="true"></header-orange>
		<div class="category-content">
			<ul class="categories-list">
				<li class="list-item" v-for="item in classifyList" @click="changeRouteParams(item.classId)">
					<span class="item-name">{{item.className}}</span>
					<i class="g-enter"></i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import HeaderOrange from '@/components/Header-Orange/Header-Orange'
	export default{
		components: {
			HeaderOrange
		},
		data() {
			return {
				classId: 0
			}
		},
		methods: {
			// 更改路由参数
			changeRouteParams (classId) {
				this.classId = classId
				this.$router.push(classId)
			},
			fetchData () {
				// 触发action中的获取分类列表
				let classId = this.$route.params.classId
				classId = classId === "all" ? "" : classId
				this.$store.dispatch("getClassifyList", classId)
			}
		},
		watch: {
			// 监听路由变化，执行fetchData
			"$route": "fetchData"
		},
		created () {
			// 隐藏tabBar
			this.$store.commit("CHANGE_TABBAR", false)

			this.fetchData()
		},
		computed: {
			// 从store中获取分类数据
			classifyList () {
				let list = this.$store.state.classifyList
				if (list === null && this.classId !== 0) {
					this.$router.replace("/GoodsList/class/" +  this.classId)
				}
				return list
			}
		}
	}
</script>
<style scoped>
	.category-content{
		position: absolute;
		left: 0;
		right: 0;
		top: .375rem;
		bottom: 0;
		background-color: #F5F5F5;
		padding: .15rem 1.5% .1rem;
	}
	.categories-list{
		width: 100%;
		border: .01rem solid #ccc;
		border-bottom: none;
		background-color: #fff;
	}
	.categories-list .list-item{
		width: 100%;
		height: .42rem;
		line-height: .42rem;
		border-bottom: .01rem solid #ccc;
		font-size: .13rem;
		position: relative;
	}
	.list-item .item-name{
		float: left;
		line-height: .42rem;
		color: #6e6e6e;
		text-indent: .05rem;
	}
	.list-item .g-enter{
		position: absolute;
		top: 50%;
		right: .1rem;
		border: .01rem solid #939393;
		border-top-color: transparent;
		border-left-color: transparent;
		transform: rotate(-45deg);
		width: .03rem;
		height: .03rem;
		margin-top: -.015rem;
	}
</style>