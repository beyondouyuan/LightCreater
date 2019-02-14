/*
* @Author: beyondouyuan
* @Date:   2018-12-10 14:46:07
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 02:01:25
*/

import * as types from './mutations-types'

export const userInfoAction = ({commit}, userInfo) => {
    commit(types.SET_USER_INFO, userInfo)
}
