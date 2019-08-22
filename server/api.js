const { requestGithub } = require('../lib/api')

module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path.startsWith('/github')) {
      console.log('ctx.request.body', ctx.request.body)
      const githubAuth = ctx.session.githubAuth
      const token = githubAuth && githubAuth.access_token
      let headers = {}
      if (token) {
        headers['Authorization'] = `${githubAuth.token_type} ${token}`
      }
      const result = await requestGithub(method, ctx.url.replace('/github/', '/'), ctx.request.body || {}, headers)
      ctx.status = result.status
      ctx.body = result.data
    } else {
      await next()
    }
  })
}