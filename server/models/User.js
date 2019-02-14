/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:26
 * @UserSchema 用户
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-24 12:37:43
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 数据库中用户ID唯一
  _id: {
    type: String,
    default: shortid.generate
  },
  username: String, // 用户名 唯一
  password: String, // 密码 必须
  email: String, // 邮箱 唯一
  phone: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'admin'
  },
  enable: {
    type: Boolean,
    default: true
  },
  // 用户其他相关信息
  nickname: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  // 统计信息
  register_time: { // 注册时间
    type: Date,
    default: Date.now
  },
  update_time: { // 最近更新
    type: Date,
    default: Date.now
  },
  register_ip: { // 注册ip
    type: String,
    default: ''
  },
  last_login_time: { // 最近登录
    type: Date,
    default: Date.now
  },
  last_login_ip: { // 最近登录ip
    type: String,
    default: ''
  }
})
UserSchema.set('toJSON', {
  getters: true,
  virtual: true
})
UserSchema.set('toObject', {
  getters: true,
  virtual: true
})

UserSchema.path('register_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})

UserSchema.path('update_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})

UserSchema.path('last_login_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})

export default mongoose.model('User', UserSchema)
