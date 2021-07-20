const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  if (req.url.startsWith('/backend')) {
    target = 'https://bookstore-server.aruoxi.com'
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/backend/': '/'
    }
  })(req, res)
}
