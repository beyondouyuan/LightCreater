import Vue from 'vue'
import Router from 'vue-router'
import HomeLayout from '@/views/HomeLayout'
import EditLayout from '@/views/EditLayout'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'HomeLayout',
		component: HomeLayout,
		children: [{
			path: '',
			name: 'MultipleTheme',
			title: 'HTML5作品',
			component: resolve => require.ensure([], () => resolve(require('@/views/Multiple/Theme')), 'MultipleTheme'),
			meta: {
				title: 'HTML5作品'
			}
		}, {
			path: '/single',
			name: 'SingleTheme',
			title: '单页作品',
			component: resolve => require.ensure([], () => resolve(require('@/views/Single/Theme')), 'SingleTheme'),
			meta: {
				title: '单页作品'
			}
		}, {
			path: '/user',
			name: 'UserAbout',
			title: '关于作者',
			component: resolve => require.ensure([], () => resolve(require('@/views/User/About')), 'UserAbout'),
			meta: {
				title: '关于作者'
			}
		}]
	}, {
		path: '/edit',
		name: 'EditLayout',
		component: EditLayout,
		children: [{
			path: 'h5/:id',
			name: 'MultipleHome',
			title: '制作H5应用',
			component: resolve => require.ensure([], () => resolve(require('@/views/Multiple/Home')), 'MultipleHome'),
			meta: {
				title: '制作H5应用'
			}
		}, {
			path: 'single/:id',
			name: 'SingleHome',
			title: '制作单页应用',
			component: resolve => require.ensure([], () => resolve(require('@/views/Single/Home')), 'SingleHome'),
			meta: {
				title: '制作单页应用'
			}
		}]
	}]
})