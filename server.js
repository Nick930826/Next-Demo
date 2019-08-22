const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session  = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')
const auth = require('./server/auth')
const api = require('./server/api')

const RedisSessionStore = require('./server/session-store')

const isDev = process.env.NODE_ENV !== 'production'

const app = next({ dev: isDev })
const handle = app.getRequestHandler()
// 创建redisClient
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router  = new Router()
  server.use(koaBody())

  server.keys = ['Nick develop Github App']
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }
  server.use(session(SESSION_CONFIG, server))
  // 配置处理github OAuth的登录
  auth(server)
  api(server)


  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    // 设置“ctx.respond = false” 是因为handle内部已经对ctx.body做了处理，无需koa内部实现响应的内容
    ctx.respond = false
  })
  server.listen(3000, () => {
    console.log(`run at 3000`)
  })
})