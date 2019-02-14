/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 14:46:07
 * @Last Modified by:   liyuan
 * @Last Modified time: 2018-12-10 14:52:27
 */


import * as types from './mutations-types'

const mutations = {
	[types.SET_ACCOUNT](state, account) {
		state.account = account
	}
}

export default mutations