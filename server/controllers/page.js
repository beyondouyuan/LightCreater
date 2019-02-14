/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 12:40:15
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-14 23:45:32
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import fs from 'fs'
import shortid from 'shortid'
import bcrypt from 'bcryptjs'
import {
  renderApiData,
  renderApiError,
  getClientIP
} from '../utils'
import PageSchema from '../models/Page'
import {
  renderFile,
  saveFile
} from '../utils/tools'
export default {
  async create(req, res, next) {
    const {
      body: fields,
      session: _session
    } = req
    console.log(fields)
    const obj = {
      pages: fields.pages,
      title: fields.title,
      description: fields.description,
      html: fields.html,
      // user_id: _session.userInfo.id || 'yB5C9FeRT',
      user_id: 'yB5C9FeRT',
      type: fields.type,
      canvasH: fields.canvasH
    }

    const page = new PageSchema(obj)

    try {
      const pageObj = await page.save()
      return res.send(renderApiData(req, res, 200, '页面创建成功', {
        id: pageObj._id
      }))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async get(req, res, next) {
    try {
      const pageId = req.params.id
      const queryObj = {
        _id: pageId
      }
      const page = await PageSchema.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '页面获取成功', page || {}))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async list(req, res, next) {
    try {

      const fields = req.query
      const queryObj = {}
      const page = Number(fields.page) || 1
      const pageSize = Number(fields.pageSize) || 10
      const type = fields.type || 'html5'
      // 排序
      let sortObj = {
        data: -1
      }
      queryObj.type = type
      const pageList = await PageSchema.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await PageSchema.countDocuments(queryObj)

      const pageObj = {
        list: pageList,
        page,
        pageSize,
        total,
        lastPage: Math.ceil(total / pageSize)
      }

      return res.send(renderApiData(req, res, 200, '页面列表获取成功', pageObj))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async delete(req, res, next) {
    try {
      const {
        id
      } = req.params
      await PageSchema.remove({
        _id: id
      })
      return res.send(renderApiData(req, res, 200, '页面删除成功', {id: id}))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async update(req, res, next) {
    const {
      body: fields,
      session: _session
    } = req
    const obj = {
      _id: fields.id,
      pages: fields.pages,
      title: fields.title,
      description: fields.description,
      html: fields.html,
      // user_id: _session.userInfo.id,
      user_id: 'yB5C9FeRT',
      type: fields.type,
      canvasH: fields.canvasH
    }
    if (fields.type === 'html5') {
      renderFile('template.html', obj, (html) => {
        saveFile(fields.id + '.html', html)
      })
    } else if (fields.type === 'spa') {
      renderFile('spa.html', obj, (html) => {
        saveFile(fields.id + '.html', html)
      })
    }


    try {
      const pageId = fields.id
      await PageSchema.findOneAndUpdate({
        _id: pageId
      }, {
        $set: obj
      })
      return res.send(renderApiData(req, res, 200, '页面更新成功', {
        id: pageId
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }

  },
  async patch(req, res, next) {
    const {
      body: fields,
      session: _session
    } = req
    const obj = {
      _id: fields.id,
      pages: fields.pages,
      title: fields.title,
      description: fields.description,
      html: fields.html,
      // user_id: _session.userInfo.id,
      user_id: 'yB5C9FeRT',
      type: fields.type
    }
    try {
      const pageId = fields.id
      await PageSchema.findOneAndUpdate({
        _id: pageId
      }, {
        $set: obj
      })
      return res.send(renderApiData(req, res, 200, '页面更新成功', {
        id: pageId
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  async render(req, res, next) {
    try {
      const pageId = req.params.id
      const queryObj = {
        _id: pageId
      }
      const page = await PageSchema.findOne(queryObj).exec()
      res.render('template', page)
    } catch (err) {
      res.render('error', {
        message: '找不到数据',
        error: err
      })
    }
  }
}
