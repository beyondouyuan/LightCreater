/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 14:46:04
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-14 21:59:38
 */

import * as types from './mutations-types'

import Page from '@/model/Page'
import Theme from '@/model/Theme'
import Element from '@/model/Element'
import {vue2json} from '@/utils/vue2json'
import {
	requestUpdateTheme,
	requestDeleteTheme,
	requestDeleteThemePicture,
	requestPostTheme,
	requestThemeList,
	requestPageByID,
	requestThemePictureList
} from '@/api'

/**
 * [更新主题/保存主题]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     theme          [description]
 * @return    {[type]}                    [description]
 */
export const saveTheme = ({
	commit
}, theme) => {
	if (theme && theme.id) {
		return new Promise((resolve, reject) => {
			requestUpdateTheme(theme)
				.then(res => {
					const {
						code,
						message,
						data
					} = res
					if (code === 200) {
						commit(types.UPDATE_THEME_SUCCESS, data)
						resolve(data)
					} else {
						reject(code)
					}
				})
		})
	} else {
		return new Promise((resolve, reject) => {
			requestPostTheme(theme)
				.then(res => {
					const {
						code,
						message,
						data
					} = res
					if (code === 200) {
						commit(types.ADD_THEME_SUCCESS, data)
						resolve(data)
					} else {
						reject(code)
					}
				})
		})
	}
}
/**
 * [description 获取主题列表]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     type           [description]
 * @return    {[type]}                    [description]
 */
export const getThemeList = ({
	commit
}, type) => {
	return new Promise((resolve, reject) => {
		requestThemeList(type)
			.then(res => {
				const {
					code,
					message,
					data: { list }
				} = res
				console.log(list)
				if (code === 200) {
					commit(types.GET_THEME_LIST, list)
					resolve(list)
				} else {
					reject(code)
				}
			})
	})
}
/**
 * [创建主题场景]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     type           [description]
 * @return    {[type]}                    [description]
 */
export const createTheme = ({
	commit
}, type) => {
	const theme = new Theme({
		type: type
	})
	commit(types.CREATE_THEME, theme)
	commit(types.SET_CURRENT_EDITOR_THEME, theme)
}
/**
 * [设置当前编辑主题]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     theme          [description]
 * @return    {[type]}                    [description]
 */
export const setCurrentTheme = ({
	commit
}, theme) => {
	const currentTheme = new Theme(theme)
	commit(types.SET_CURRENT_EDITOR_THEME, currentTheme)
}
/**
 * [设置当前编辑页面]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     theme          [description]
 * @return    {[type]}                    [description]
 */
export const setCurrentPage = ({
	commit
}, page) => {
	commit(types.SET_CURRENT_EDITOR_PAGE, page)
}
/**
 * [给主题添加页面]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @return    {[type]}                    [description]
 */
export const addPageToTheme = ({
	commit
}) => {
	const page = new Page()
	commit(types.ADD_PAGE, page)
	commit(types.SET_CURRENT_EDITOR_PAGE, page)
}
/**
 * [添加元素]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     options.state  [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const addElementToTheme = ({
	commit,
	state
}, data) => {
	commit(types.ADD_PICTURE_TO_ELEMENT, new Element(data))
	const list = state.editorPage.elements
	const lastIndex = list.length - 1
	list[lastIndex]['zIndex'] = lastIndex ? list[lastIndex - 1]['zIndex'] + 1 : 1
	commit(types.SET_CURRENT_EDITOR_ELEMENT, state.editorPage.elements[lastIndex])
}

/**
 * [添加背景图]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const addBgImageToElement = ({
	commit
}, data) => {
	const element = new Element(data)
	commit(types.SET_BG_IMAGE_TO_ELEMENT, element)
	commit(types.SET_CURRENT_EDITOR_ELEMENT, null)
}
/**
 * [保存图片]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data        [description]
 * @return    {[type]}                    [description]
 */
export const savePicture = ({
	commit
}, data) => {
	console.log(data)
	commit(types.PUSH_PICTURE_LIST, data)
}

/**
 * [保存视频]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const saveVideo = ({
	commit
}, data) => {
	commit(types.PUSH_VIDEO_LIST, data)
}
/**
 * [清除背景图]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @return    {[type]}                    [description]
 */
export const cleanBgImage = ({
	commit
}) => {
	commit(types.CLEAN_BG_IMAGE)
}
/**
 * [清除元素]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const cleanElement = ({
	commit
}, data) => {
	commit(types.CLEAN_ELEMENT, data)
}
/**
 * [复制页面]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const copyPage = ({
	commit
}, data) => {
	const page = vue2json(data)
  commit(types.ADD_PAGE, page)
}
/**
 * [删除页面]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     page           [description]
 * @return    {[type]}                    [description]
 */
export const deletePage = ({
	commit
}, page) => {
	commit(types.DELETE_PAGE, page)
}

/**
 * [获取当前主题的页面]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.dispatch [description]
 * @param     {[type]}     options.commit   [description]
 * @param     {[type]}     id               [description]
 * @return    {[type]}                      [description]
 */
export const getPageByThemeId = ({
	dispatch,
	commit
}, id) => {
	return new Promise((resolve, reject) => {
		requestPageByID({
				id
			})
			.then(res => {
				const {
					code,
					message,
					data
				} = res
				console.log(data)
				if (code === 200) {
					commit(types.SET_CURRENT_EDITOR_THEME, data)
					commit(types.SET_CURRENT_EDITOR_PAGE, data.pages[0])
					resolve(data)
				} else {
					reject(code)
				}
			}).then(() => {
				dispatch('sortElementsByZindex')
			})
	})
}
/**
 * [设置当前编辑元素]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     element        [description]
 * @return    {[type]}                    [description]
 */
export const setCurrentElement = ({
	commit
}, element) => {
	commit(types.SET_CURRENT_EDITOR_ELEMENT, element)
}

/**
 * [删除元素]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const deleteElement = ({
	commit
}, data) => {
	commit(types.DELETE_ELEMENT, data)
}

/**
 * [删除所选的元素]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     options.state  [description]
 * @return    {[type]}                    [description]
 */
export const deleteSelectedElement = ({
	commit,
	state
}) => {
	commit(types.DELETE_ELEMENT, state.editorElement)
}

/**
 * 播放动画
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.state   [description]
 * @param     {[type]}     options.commit  [description]
 * @param     {[type]}     options.getters [description]
 * @return    {[type]}                     [description]
 */
export const playAnimate = ({
	state,
	commit,
	getters
}) => {
	console.log('do animation')
	commit(types.SET_PLAY_ANIMATE)
	const target = getters['editingElement'] || getters['editingPageElements'] || null
	let timer = 0
	if (target instanceof Array) {
		target.forEach(item => {
			timer = item['animatedName'] && (item['duration'] + item['delay']) > timer ? (item['duration'] + item['delay']) : timer
		})
	} else if (target instanceof Object) {
		timer = (target['duration'] + target['delay'])
	}
	setTimeout(() => {
		commit(types.SET_STOP_ANIMATE, target)
	}, timer * 1000)
}
/**
 * [获取当前主题的图片列表]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     id             [description]
 * @return    {[type]}                    [description]
 */
export const getPictureListByThemeId = ({
	commit
}, id) => {
	return new Promise((resolve, reject) => {
		requestThemePictureList({id})
			.then(res => {
				const {
					code,
					message,
					data: {list}
				} = res
				if (code === 200) {
					commit(types.FETCH_PICTURE_LIST, list)
					resolve(list)
				} else {
					reject(code)
				}
			})
	})
}
/**
 * [获取视频列表]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     id             [description]
 * @return    {[type]}                    [description]
 */
export const getVideoListByThemeId = ({
	commit
}, id) => {

}
/**
 * [清除图片列表]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @return    {[type]}                    [description]
 */
export const cleanPictureList = ({
	commit
}) => {
	commit(types.CLEAN_PICTURE_LIST)
}

/**
 * [元素层级排序]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     zIndex         [description]
 * @return    {[type]}                    [description]
 */
export const sortElementsByZindex = ({
	commit
}, zIndex) => {
	commit(types.SORT_ELEMENTS_BY_ZINDEX, zIndex)
}
/**
 * 删除主题
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2019-01-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     options.commit [description]
 * @param     {[type]}     data           [description]
 * @return    {[type]}                    [description]
 */
export const deleteTheme = ({
	dispatch,
	commit
}, data) => {
	return new Promise((resolve, reject) => {
		requestDeleteTheme(data)
		.then(res => {
				const {
					code,
					message
				} = res
				if (code === 200) {
					commit(types.DELETE_THEME, data)
					resolve(code)
				} else {
					reject(code)
				}
			})
		.then(() => {
			dispatch('deleteThemePicture', data)
		})
	})
}


export const deleteThemePicture = ({
	commit
}, data) => {
	requestDeleteThemePicture(data)
	.then(res => {
		console.log(res)
	})
}

