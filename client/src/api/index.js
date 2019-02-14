/*
 * @Author: beyondouyuan
 * @Date:   2019-01-22 14:51:59
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-14 22:52:42
 */

import request from '@/utils/request'
import parseAPI from './urls'

export const requestUpdateTheme = data => {
	return request({
			url: parseAPI('page'),
			method: 'PUT',
			data
		})
		.then(res => res.data)
}

export const requestPostTheme = data => {
	return request({
			url: parseAPI('page'),
			method: 'POST',
			data
		})
		.then(res => res.data)
}

export const requestDeleteTheme = data => {
  return request({
      url: `${parseAPI('page')}/${data.id}`,
      method: 'DELETE',
      data
    })
    .then(res => res.data)
}

export const requestDeleteThemePicture = data => {
  return request({
      url: `${parseAPI('theme')}/${data.id}`,
      method: 'DELETE',
      data
    })
    .then(res => res.data)
}

export const requestThemeList = type => {
	return request({
			url: parseAPI('page'),
			method: 'GET',
			params: {
        type
      }
		})
		.then(res => res.data)
}
export const requestPageByID = params => {
	return request({
			url: `${parseAPI('page')}/${params.id}`,
			method: 'GET',
			params
		})
		.then(res => res.data)

}

export const requestUploadImage = (params, data) => {
	console.log()
  return request({
      url: `${parseAPI('upload')}?${formatParams(params)}`,
      method: 'POST',
      headers: {
        'Content-Type':'multipart/form-data'
      },
      data: data
    })
    .then(res => res.data)
}
export const requestThemePictureList = params => {
  return request({
      url: `${parseAPI('theme')}/${params.id}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}




function formatParams(data) {
    const arr = []
    for (let name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
    }
    return arr.join("&")
}
