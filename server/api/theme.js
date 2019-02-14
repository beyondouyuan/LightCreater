/*
* @Author: beyondouyuan
* @Date:   2019-01-24 13:34:10
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 00:13:41
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import { Router } from 'express'

import ThemeController from '../controllers/theme'

const router = Router()


router.get('/theme',  ThemeController.list)
router.get('/theme/:id',  ThemeController.get)
router.delete('/theme/:id',  ThemeController.delete)
router.post('/upload',  ThemeController.create)


export default router
