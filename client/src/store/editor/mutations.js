/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 14:46:04
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-28 16:25:06
 */

import * as types from './mutations-types'
import Element from '../../model/Element'


const mutations = {
	[types.SET_CURRENT_EDITOR_ELEMENT](state, data) {
		state.editorElement = data
	},
	[types.ADD_PICTURE_TO_ELEMENT](state, data) {
		state.editorPage.elements.push(new Element(data))
	},
	[types.SET_BG_IMAGE_TO_ELEMENT](state, data) {
		let hasBG = false
		state.editorPage.elements.findIndex((item, index, arr) => {
			if (item.type === 'bg') {
				hasBG = true
				item.imgSrc = data.imgSrc
				item.bg = data.imgSrc
				item.width = data.width
				item.height = data.height
			}
		})
		if (!hasBG) {
			state.editorPage.elements.push(new Element(data))
		}
	},
	[types.SET_PLAY_ANIMATE](state) {
		const elements = state.editorPage.elements
		const editingElement = state.editorElement
		if (editingElement && editingElement.animatedName) {
			editingElement.playing = true
		} else if (!editingElement) {
			elements.forEach(item => {
				item.playing = true
			})
		}
	},
	[types.SET_STOP_ANIMATE](state, data) {
		if (data instanceof Array) {
			data.forEach(item => {
				item['playing'] = false
			})
		} else if (data instanceof Object) {
			data['playing'] = false
		} else {
			state['editorPage']['elements'].forEach(item => {
				item['playing'] = false
			})
		}
	},
	[types.ADD_PAGE](state, page) {
		state.editorTheme.pages.push(page)
	},
	[types.DELETE_PAGE](state, page) {
		state.editorTheme.pages.findIndex((item, index) => {
			if (item === page) {
				state.editorTheme.pages.splice(index, 1)
			}
		})
	},
	[types.SET_CURRENT_EDITOR_PAGE](state, data) {
		state.editorPage = data
	},
	[types.GET_THEME_LIST](state, data) {
		state.themeList = data
	},
	[types.SET_CURRENT_EDITOR_THEME](state, data) {
		state.editorTheme = data
	},
	[types.UPDATE_THEME_DESC](state, {
		title,
		description,
		canvasH
	}) {
		state.editorTheme.title = title
		state.editorTheme.description = description
		state.editorTheme.canvasH = canvasH
	},
	[types.UPDATE_THEME_SUCCESS](state, data) {
		state.editorTheme.id = data.id
	},
	[types.DELETE_ELEMENT](state, data) {
		state.editorPage.elements.findIndex((item, index) => {
			if (item.type === data) {
				state.editorPage.elements.splice(index, 1)
				state.editorElement = null
			}
		})
	},
	[types.CREATE_THEME](state, data) {
		state.themeList.push(data)
	},
	[types.ADD_THEME_SUCCESS](state, data) {
		state.editorTheme.id = data.id
	},
	[types.SAVE_PICTURE](state, data) {
		state.editorTheme.imgSrc = data.filePath
	},
	[types.GET_PAGE_BY_THEME_ID](state, data) {
		state.editorPage = data
	},
	[types.CLEAN_BG_IMAGE](state) {
		state.editorPage.elements.findIndex((item, index) => {
			if (item && item.type === 'bg') {
				state.editorPage.elements.splice(index, 1)
			}
		})
	},
	[types.CLEAN_ELEMENT](state, element) {
		state.editorPage.elements.splice(state.editorPage.elements.indexOf(element), 1)
	},
	[types.FETCH_PICTURE_LIST](state, picList) {
		state.picList = picList
	},
	[types.FETCH_VIDEO_LIST](state, videoList) {
		state.videoList = videoList
	},
	[types.PUSH_PICTURE_LIST](state, data) {
		state.picList.push(data)
	},
	[types.FETCH_VIDEO_LIST](state, data) {
		state.videoList.push(data)
	},
	[types.CLEAN_PICTURE_LIST](state) {
		state.picList = []
	},
	[types.DELETE_THEME](state, data) {
		state.themeList.findIndex((item, index) => {
			if (item === data) {
				state.themeList.splice(index, 1)
			}
		})
	},
	[types.SORT_ELEMENTS_BY_ZINDEX](state, data) {
		state.editorPage.elements.sort((a, b) => a['zIndex'] - b['zIndex'])
		state.editorPage.elements.forEach((item, index, arr) => {
			arr[index]['zIndex'] = index + 1
		})
	}
}

export default mutations
