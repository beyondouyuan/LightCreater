/*
* @Author: beyondouyuan
* @Date:   2019-02-15 00:26:06
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-15 00:26:08
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import Mongo from 'connect-mongo'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import config from './config'
import path from 'path'
import api from './api'
import ejs from 'ejs'
const app = express()
const host = process.env.HOST || config.host
const port = process.env.PORT || config.port



const MongoStore = Mongo(session)

mongoose.Promise = global.Promise
const db = mongoose.connection


app.use(express.static(path.join(__dirname, 'public')))
app.set('port', port)


config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // mongodb
  if (config.dev) {
    mongoose.connect(config.TEST_DB_URL, {
      useNewUrlParser:true
    })
    db.on('error', console.error.bind(console, 'connection error: '))
    db.once('open', () => {
      console.log('mongodb test database opend!')
    })
  } else {
    mongoose.connect(config.PROD_DB_URL, {
      authdb: 'irving_database'
    })
    db.on('error', console.error.bind(console, 'connection error: '))
    db.once('open', () => {
      console.log('mongodb prod database opend!')
    })
  }
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use(session({
    secret: config.secret,
    resave: config.resave,
    saveUninitialized: config.saveUninitialized,
    cookie: {
      maxAge: config.maxAge,
      secure: false,
      httpOnly: true
    },
    store: new MongoStore({
      mongooseConnection: db
    })
  }))
  // app.set('view engine', 'pug');
  // app.set('views', path.join(__dirname, 'views'))
  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'views'))
  // CORS解决跨域问题
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
      /让options请求快速返回/
    } else {
      next();
    }
  })
  app.use(`/api${config.APIVersionURL}`, api)

  app.listen(port, host)
  console.log(`Server listening on ===>>>> http://${host}:${port}`)
}
start()
