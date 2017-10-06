import Vue from 'vue'
import Vuex from 'vuex'
import http from 'axios'

Vue.use(Vuex)

import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
