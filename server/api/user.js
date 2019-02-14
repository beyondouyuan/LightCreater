/*
* @Author: beyondouyuan
* @Date:   2019-01-24 13:29:45
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-24 13:49:59
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import { Router } from 'express'

import UserController from '../controllers/user'

const router = Router()

router.get('/user',  UserController.list)
router.get('/user/:id',  UserController.get)
router.post('/user',  UserController.create)
/* 用户登陆 */
router.post('/user/login', UserController.login)
router.post('/user/logout', UserController.logout)
export default router
