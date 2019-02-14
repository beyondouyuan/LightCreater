/*
 * @Author: beyondouyuan
 * @Date:   2019-01-22 23:20:32
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-22 23:23:53
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

export default class Theme {
  constructor(theme = {}) {
    this.title = theme.title || '标题'
    this.description = theme.description || '描述'
    this.pages = theme.pages || []
    this.type = theme.type || 'html5'
    this.canvasH = theme.canvasH || 603
  }
}
