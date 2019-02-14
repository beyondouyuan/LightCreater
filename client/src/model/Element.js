/*
 * @Author: beyondouyuan
 * @Date:   2019-01-22 23:24:12
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-25 17:24:48
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

export default class Element {
  constructor(element = {}) {
    this.type = element.type || 'pic' // 元素类型
    this.imgSrc = element.imgSrc || '' // 图片地址
    this.videoSrc = element.videoSrc || '' // 视频地址
    this.left = element.left || 0 // x轴坐标
    this.top = element.top || 0 // y轴坐标
    this.width = element.width || 0 // 元素宽带
    this.height = element.height || 0 // 元素高度
    this.lineHeight = element.lineHeight || 0 // 元素高度
    this.animatedName = element.animatedName || '' // 动画名称
    this.duration = element.duration || 1 // 动画速度
    this.delay = element.delay || 0 // 动画延迟
    this.playing = false // 动画正在播放
    this.loop = false // 动画循环
    this.opacity = element.opacity || 100 // 元素透明度
    this.transform = element.transform || 0 // 元素旋转角度
    this.text = element.text || 0 // 元素文本
    this.textAlign = element.textAlign || 'left' // 元素对齐方式
    this.iconKey = element.iconKey || '' // 元素图标
    this.bg = element.bg || '' // 元素背景
    this.fontSize = element.fontSize || 18 // 元素字体大小
    this.fontFamily = element.fontFamily || '微软雅黑' // 元素字体
    this.fontWeight = element.fontWeight || 'normal' // 元素字体粗细
    this.color = element.color || '#FF00FF' // 元素字体颜色
    this.zIndex = element.zIndex || 1 // 元素层级
  }
}
