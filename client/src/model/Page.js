/*
 * @Author: beyondouyuan
 * @Date:   2019-01-22 23:23:08
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-22 23:33:20
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

export default class Page {
  constructor(page = {}) {
    this.elements = page.elements || []
  }
}
