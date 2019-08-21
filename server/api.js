const axios = require('axios')
const githubApiPath = 'https://api.github.com'
module.exports = (server) => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    if (path.startsWith('/github')) {
      const githubAuth = ctx.session.githubAuth
      const githubPath = ctx.url.replace('/github/', '/')
      console.log('`${githubApiPath}${githubPath}`', `${githubApiPath}${githubPath}`)
      const token = githubAuth && githubAuth.access_token
      let headers = {}
      if (token) {
        headers['Authorization'] = `${githubAuth.token_type} ${token}`
      }
      try {
        const result = await axios({
          method: 'GET',
          url: `${githubApiPath}${githubPath}`,
          headers
        })
        console.log('result', result)
        if (result.status == 200) {
          ctx.body = result.data
          ctx.set('Content-Type', 'application/json')
        } else {
          ctx.body = {
            msg: '接口错误',
            errcode: 1
          }
          ctx.set('Content-Type', 'application/json')
        }
      } catch (error) {
        console.log('error', error)
        ctx.body = {
          msg: '接口错误',
          errcode: 1
        }
        ctx.set('Content-Type', 'application/json')
      }
     
    } else {
      await next()
    }
  })
}