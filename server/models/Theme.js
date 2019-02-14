/*
* @Author: beyondouyuan
* @Date:   2019-01-24 12:29:07
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 00:14:33
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/


import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const ThemeSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  file_path: {
    type: String,
    required: true
  },
  type: String,
  width: Number,
  height: Number,
  file_name: String,
  theme_id: {
    type: String
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



ThemeSchema.path('update_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})


export default mongoose.model('File', ThemeSchema)
