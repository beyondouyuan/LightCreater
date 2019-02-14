/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 13:51:23
 * @Last Modified by:   liyuan
 * @Last Modified time: 2018-12-10 14:32:53
 */

import waves from './waves'

const install = function(Vue) {
	Vue.directive('waves', waves)
}

if (window.Vue) {
	window.waves = waves
	Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves