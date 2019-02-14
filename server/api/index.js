/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 13:36:45
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 00:12:53
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import {
  Router
} from 'express'


import user from './user'
import page from './page'
import theme from './theme'

const router = Router()


router.use(user)
router.use(page)
router.use(theme)

export default router
