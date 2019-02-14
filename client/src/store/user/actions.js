/*
* @Author: beyondouyuan
* @Date:   2018-12-10 14:46:07
* @Last Modified by:   liyuan
* @Last Modified time: 2018-12-10 14:49:11
*/

import * as types from './mutations-types'

export const AccountAction = ({commit}, account) => {
    commit(types.SET_ACCOUNT, account)
}