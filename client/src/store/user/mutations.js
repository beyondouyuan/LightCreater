/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 14:46:07
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 01:37:23
 */


import * as types from './mutations-types'

const mutations = {
	[types.SET_USER_INFO](state, userInfo) {
		state.userInfo = userInfo
	}
}

export default mutations
