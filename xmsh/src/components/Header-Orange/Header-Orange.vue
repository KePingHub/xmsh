<template>
	<header>
		<div class="top-content-wrap">
			<span v-if="back==='true'" @click="goBack" class="go-back">
				<i class="fa-anger-left"></i>
			</span>
			<span id="subjectTitle" class="subjectTitle">{{headerTitle}}</span>
		</div>
	</header>
</template>
<script>
	export default {
		props: ["headerTitle", "back"],
		methods: {
			goBack() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style scoped>
	.top-content-wrap{
		position: fixed;
		top: 0;
		z-index: 20;
		text-align: center;
		height: .375rem;
		width: 100%;
		font-size: .15rem;
		line-height: .375rem;
		background-color: #ff6300;
	}
	.go-back{
		position: absolute;
		top: 0;
		left: 0;
		width: .426rem;
		height: 100%;
	}
	.fa-anger-left{
		position: relative;
		display: inline-block;
		width: .17rem;
		height: .17rem;
		margin-top: .102rem;
	}
	.fa-anger-left:after{
		position: absolute;
		left: .03rem;
		top: .03rem;
		width: .11rem;
		height: .11rem;
		content: "";
		border-left: .01rem solid #fff;
		border-bottom: .01rem solid #fff;
		transform: rotate(45deg);
	}
	.subjectTitle{
		display: inline-block;
		height: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #fff;
		font-weight: 700;
		letter-spacing: .007rem;
	}
</style>