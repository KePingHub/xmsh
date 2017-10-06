<template>
	<nav id="bottomNav">
		<router-link to="/" class="nav-item">首页</router-link>
		<router-link to="/category/all" class="nav-item">分类</router-link>
		<router-link to="/cart" class="nav-item">购物车</router-link>
		<router-link to="/detail" class="nav-item">我的</router-link>
	</nav>
</template>
<script>
	export default {

	}
</script>
<style scoped>
	nav{
		width: 100%;
		height: .32rem;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: .01rem solid #d8d8d8;
		padding: .04rem 0;
		overflow: hidden;
		z-index: 30;
	}
	nav .nav-item{
		float: left;
		width: 25%;
		font-size: .1rem; 
		color: #666;
		line-height: .14rem;
		text-decoration: none;
		text-align: center;
		padding-top: .21rem;
		background: url("./images/home.png") no-repeat center top;
		background-size: .19rem;
	}
	nav .nav-item:nth-child(2){
		background-image: url("./images/category.png");
	}
	nav .nav-item:nth-child(3){
		background-image: url("./images/cart.png");
	}
	nav .nav-item:nth-child(4){
		background-image: url("./images/mine.png");
	}
	nav .nav-item.router-link-exact-active{
		color: #fe6301;
	}
	nav .nav-item:nth-child(1).router-link-exact-active{
		background-image: url("./images/home-active.png");
	}
	nav .nav-item:nth-child(2).router-link-exact-active{
		background-image: url("./images/category-active.png");
	}
	nav .nav-item:nth-child(3).router-link-exact-active{
		background-image: url("./images/cart-active.png");
	}
	nav .nav-item:nth-child(4).router-link-exact-active{
		background-image: url("./images/mine-active.png");
	}

</style>