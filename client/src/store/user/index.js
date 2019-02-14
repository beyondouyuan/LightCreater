/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 14:46:07
 * @Last Modified by:   liyuan
 * @Last Modified time: 2018-12-10 14:51:01
 */


import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const state = {
	account: {}
}

export default {
	state,
	getters,
	actions,
	mutations
}