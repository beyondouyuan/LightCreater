/*
 * @Author: beyondouyuan
 * @Date:   2018-12-10 13:52:57
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-24 16:23:18
 */


import axios from 'axios'

const service = axios.create({
	baseURL: process.env.ENV_CONFIG == 'dev' ? '/api/' : 'http://127.0.0.1:3000',
	timeout: 5000
})

service.interceptors.request.use(config => {
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})
service.interceptors.response.use(
	response => response,
	error => {
		console.log('error' + error)
		return Promise.reject(error)
	}
)

export default service
