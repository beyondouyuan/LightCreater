/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 14:23:02
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-24 14:23:49
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

export const vue2json = vue => {
  if (vue) {
    return JSON.parse(JSON.stringify(vue))
  }
}
