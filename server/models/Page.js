/*
* @Author: beyondouyuan
* @Date:   2019-01-24 12:20:39
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-14 23:43:59
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/


import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const PagesSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  pages: {
    type: Array,
    required: true
  },
  canvasH: Number,
  title: String,
  description: String,
  html: String,
  user_id: String,
  type: {
    type: String,
    required: true,
    default: 'html5',
    enum: ['html5', 'spa'] // 页面是单页还是多页
  },
  create_time: { // 创建时间
    type: Date,
    default: Date.now
  },
  update_time: { // 最近更新
    type: Date,
    default: Date.now
  }
})
PagesSchema.set('toJSON', {
  getters: true,
  virtual: true
})
PagesSchema.set('toObject', {
  getters: true,
  virtual: true
})


PagesSchema.path('update_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})


export default mongoose.model('Page', PagesSchema)
