/*
* @Author: beyondouyuan
* @Date:   2019-02-15 00:26:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 00:26:26
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import config from '../config'
export const renderApiData = (req, res, responseCode, responseMessage, data = {}) => {
  const responseData = {
    status: responseCode,
    code: responseCode,
    success: true,
    message: responseMessage,
    request_time: (new Date()).getTime(),
    data
  }
  return responseData
}

export const renderApiError = (req, res, responseCode, responseMessage ) => {
  if (typeof responseMessage == 'object') {
    responseMessage = config.dev ? responseMessage : '发生未知错误！'
  }
  const responseData = {
    status: responseCode,
    code: responseCode,
    success: false,
    message: responseMessage,
    request_time: (new Date()).getTime(),
    data: {}

  }
  return responseData
}

export const getClientIP = req => {
  return req.headers['x-forwarded-for'] ||
   req.connection.remoteAddress ||
   req.socket.remoteAddress ||
   req.connection.socket.remoteAddress ||
   ''
}
