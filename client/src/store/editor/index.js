/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 14:46:04
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 00:19:33
 */


import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const state = {
	editorElement: {
	}, // 正在编辑的元素
	editorPage: {
		elements: []
	}, // 正在编辑的页面
	themeList: [], // 用户所有主题列表
	editorTheme: {
		title: '',
		description: '',
		canvasH: 603
	}, // 正在编辑的主题
	canvasH: 603,
	picList: [], // 图片列表
	videoList: [] // 视频列表
}

export default {
	state,
	getters,
	actions,
	mutations
}
