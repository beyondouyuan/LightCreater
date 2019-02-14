/*
* @Author: beyondouyuan
* @Date:   2019-01-24 13:31:47
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-28 16:45:28
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import { Router } from 'express'

import PageController from '../controllers/page'

const router = Router()

router.get('/page',  PageController.list)
router.get('/page/:id',  PageController.get)
router.post('/page',  PageController.create)
router.delete('/page/:id',  PageController.delete)
router.put('/page',  PageController.update)

router.get('/render/:id',  PageController.render)
export default router
