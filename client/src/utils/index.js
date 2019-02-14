/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 13:49:21
 * @Last Modified by:   liyuan
 * @Last Modified time: 2018-12-10 14:42:26
 */

export const setSessionStorage = (k, v) => {
	sessionStorage.setItem(k, JSON.stringify(v))
}

export const getSessionStorage = k => {
	return JSON.parse(sessionStorage.getItem(k))
}
export const removeSessionStorage = k => {
	return sessionStorage.removeItem(k)
}