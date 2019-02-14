/*
* @Author: beyondouyuan
* @Date:   2019-01-22 14:51:59
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-23 16:24:38
*/


export const editingElement = state => state.editorElement

export const editingTheme = state => state.editorTheme

export const editingPage = state => state.editorPage

export const editingPageElements = state => {
	return state['editorPage']['elements']
}

export const elements = (state, getter) => {
	const pages = getter['editingTheme']['pages']
	if (pages) {
		const result = []
		pages.forEach(item => {
			item['elements'] && item['elements'].forEach(v => {
				result.push(v)
			})
		})
		return result
	} else {
		return null
	}
}