/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 12:40:01
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 01:20:40
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import fs from 'fs'
import shortid from 'shortid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import {
  renderApiData,
  renderApiError,
  getClientIP
} from '../utils'
import config from '../config'
import UserSchema from '../models/User'
// 加密等级
const passLevel = 10

export default {
  async create(req, res, next) {
    const {
      body: fields
    } = req
    console.log(fields)
    const obj = {
      username: fields.username,
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      role: fields.role || 'member',
      phone: fields.phone,
      enable: true
    }

    try {
      // 加密
      const hash = await bcrypt.hash(obj.password, passLevel)
      if (hash) {
        obj.password = hash
        const newUser = new UserSchema(obj)
        const userObj = await newUser.save()

        return res.send(renderApiData(req, res, 200, '用户创建成功', {
          id: userObj._id
        }))
      } else {
        return res.send(renderApiError(req, res, 500, '密码加密出错'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async list(req, res, next) {
    try {
      const {
        query: fields
      } = req

      const queryObj = {}
      // 按创建时间倒序
      const sortObj = {
        create_time: -1
      }
      let page = Number(fields.page) || 1,
        pageSize = Number(fields.pageSize) || 10;
      const role = fields.role
      const sortBy = fields.sortBy

      if (role === 'superAdmin' || role === 'admin' || role === 'member') {
        queryObj['role'] = role
      }
      if (sortBy) {
        sortObj[sortBy] = -1
      }
      const userList = await UserSchema.find(queryObj, {
        password: 0
      }).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await UserSchema.countDocuments(queryObj)

      const userObj = {
        list: userList,
        page: page,
        lastPage: Math.ceil(total / pageSize),
        pageSize: pageSize,
        total: total
      }

      return res.send(renderApiData(req, res, 200, '用户列表获取成功', userObj))
    } catch (e) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async get(req, res, next) {
    try {
      const {
        id: userId
      } = req.params
      const queryObj = {
        _id: userId
      }

      const user = await UserSchema.findOne(queryObj, {
        password: 0
      }).exec()

      return res.send(renderApiData(req, res, 200, '用户获取成功', user))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async login(req, res, next) {
    const {
      body: fields
    } = req
    const userObj = {
      email: fields.email
    }
    const purePassword = fields.password

    try {
      const user = await UserSchema.findOne(userObj).exec()
      if (user) {
        if (!user.enable) {
          return res.send(renderApiError(req, res, 401, '账号已被禁用'))
        }
        const hashPassword = await bcrypt.compare(purePassword, user.password)
        if (!hashPassword) {
          return res.send(renderApiError(req, res, 401, '用户名或密码错误'))
        }
        const ip = getClientIP(req)
        user.last_login_ip = ip
        user.last_login_time = Date.now()
        const token = jwt.sign({
          _id: user._id
        }, config.secret, {
          expiresIn: 60 * 60 * 5
        })
        const result = {
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
          avatar: user.avatar,
          token
        }
        return res.send(renderApiData(req, res, 200, '登陆成功', result))
      } else {
        return res.send(renderApiError(req, res, 404, '账号不存在'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async logout(req, res, next) {
    return res.send(renderApiData(req, res, 200, '登出成功'))
  }
}
