import { createRequestHandler } from '@remix-run/express'
import express from 'express'

const viteDevServer =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? null
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      )

const app = express()
app.use(viteDevServer ? viteDevServer.middlewares : express.static('build/client'))

const build = viteDevServer ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build') : await import('./build/server/index.js')

app.all('*', createRequestHandler({ build }))
const port = process.env.PORT || 3000
const strapi_url = process.env.STRAPI_URL || 'http://localhost:1337'
app.listen(port, () => {
  console.log(`API url: ${strapi_url}`)
  console.log(`App listening on http://localhost:${port}`)
})
