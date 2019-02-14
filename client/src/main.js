import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.scss'

import store from '@/store'

import * as filters from './filters'

import './permission' // 权限菜单

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
