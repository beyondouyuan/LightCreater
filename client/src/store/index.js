/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 13:49:07
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-25 17:27:32
 */

import Vue from 'vue'
import Vuex from 'vuex'

import editor from './editor'
import user from './user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = {
	modules: {
		editor,
		user
	},
  plugins: [createPersistedState({
    storage: window.sessionStorage
    // storage: window.localStorage
  })]
}

export default new Vuex.Store(Store)
