/*
* @Author: beyondouyuan
* @Date:   2019-02-15 00:26:34
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 00:27:22
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/


import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import mkdirp from 'mkdirp'

export const base64ToImg = (imgData, filePath) => {
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
  const dataBuffer = new Buffer(base64Data, 'base64')
  const fileDir = path.dirname(filePath)
  mkdirp(fileDir, (err) => {
    fs.writeFile(filePath, dataBuffer, (err) => {})
  })
}
/**
 * 获取上传文件后缀
 * @param {*} imgData
 */
export const getFileExt = (imgData) => {
  if (imgData.indexOf('image/gif') > -1) {
    return '.gif'
  } else {
    return '.png'
  }
}
export const renderFile = (filePath, data, success) => {
  const rootPath = path.join(__dirname, '../views/')
  fs.readFile(rootPath + filePath, {
    flag: 'r+',
    encoding: 'utf8'
  }, function(err, result) {
    if (err) {
      console.log(err)
      return;
    }
    const html = ejs.render(result, data)
    success(html)
  })
}
export const saveFile = (filePath, data, success) => {
  const rootPath = path.join(__dirname, '../public/pages/')
  mkdirp(rootPath, (err) => {
    fs.writeFile(rootPath + filePath, data, function(err) {
      if (err) {
        console.error(err);
      } else {
        success && success()
      }
    });
  })

}

export const mkdirs = function(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}
