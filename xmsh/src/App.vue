<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-if="tabBarShow"></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar/TabBar"

export default {
  name: 'app',
  components: {
    TabBar
  },
  created() {
    this.$store.dispatch("getCartGoods")
    this.$store.dispatch("getCollects")
  },
  computed: {
    tabBarShow() {
      return this.$store.state.tabBarShow
    }
  }
}
</script>
<style>
	#app{
		height: 100%;
	}
</style>

