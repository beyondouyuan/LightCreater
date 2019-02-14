/*
* @Author: beyondouyuan
* @Date:   2019-01-23 15:43:06
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 01:53:02
*/

const urls = {
    // 获取用户信息模块
    'login': '/api/v1/user/login', // login 登陆
    'register': '/api/v1/user/register', // register 注册
    'logout': '/api/v1/user/logout', // logout 登出
    'theme': '/api/v1/theme',
    'page': '/api/v1/page',
    'upload': '/api/v1/upload',

}
const parseAPI = api => {
    return `${urls[api]}`
}

export default parseAPI
