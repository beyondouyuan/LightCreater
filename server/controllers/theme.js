/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 12:40:09
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 00:14:56
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import fs from 'fs'
import uuid from 'node-uuid'
import path from 'path'
import shortid from 'shortid'
import multer from 'multer'
import {
  renderApiData,
  renderApiError,
  getClientIP
} from '../utils'
import ThemeSchema from '../models/Theme'

export default {
  async create(req, res, next) {
    const queryObj = {
      width: req.query.width,
      height: req.query.height,
      theme_id: req.query.themeId,
    }
    try {
      const {
        name
      } = req.query
      if (name !== 'cover' && name !== 'bg') {
        return res.send(renderApiError(req, res, 500, '参数错误'))
      }
      const lastDir = name
      const storage = multer.diskStorage({
        destination: `server/public/upload/images/${lastDir}`,
        fileFilter: (req, files, callback) => {
          const type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
          const fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
          return callback(null, !!fileTypeValid)
        },
        filename: (req, file, callback) => {
          const fileFormat = (file.originalname).split(".")
          return callback(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
        }
      })
      const upload = multer({
        storage: storage
      })
      // 上传单张图片/ ===>>>后异步回调中保存到数据库
      upload.single(name)(req, res, async (err) => {
        if (err) {
          return res.send(renderApiError(req, res, 500, err))
        }
        if (req.file) {
          // 保存到数据库
          const obj = {
            ...queryObj,
            type: 'image',
            file_path: `http://127.0.0.1:3000/upload/images/${lastDir}/${req.file.filename}`
          }
          const fileSave = new ThemeSchema(obj)

          try {
            const fileObj = await fileSave.save()
            return res.send(renderApiData(req, res, 200, '图片保存成功', fileObj || {}))

          } catch (err) {
            return res.send(renderApiError(req, res, 500, err))
          }
        }
      })

    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async get(req, res, next) {
    try {
      const theme_id = req.params.id
      console.log(theme_id)
      // 排序
      let sortObj = {
        data: -1
      }
      const pageList = await ThemeSchema.find({theme_id: theme_id}).sort(sortObj).exec()


      const pageObj = {
        list: pageList
      }

      return res.send(renderApiData(req, res, 200, '页面列表获取成功', pageObj))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async list(req, res, next) {

  },
  async delete(req, res, next) {
    try {
      const {
        id
      } = req.params
      await ThemeSchema.remove({
        theme_id: id
      })
      return res.send(renderApiData(req, res, 200, '页面图片删除成功', {id: id}))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  }
}
