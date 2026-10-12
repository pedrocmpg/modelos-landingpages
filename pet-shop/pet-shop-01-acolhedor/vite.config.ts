import react from '@vitejs/plugin-react'
import type { Plugin, ViteDevServer } from 'vite'
import { defineConfig } from 'vitest/config'
import { aplicarAoHtml, robotsTxt } from './src/config/head.ts'
import staticConfig from './src/config/site.config.ts'
import type { SiteConfig } from './src/config/types.ts'

// Gera o que fica fora do React a partir de src/config/site.config.ts:
// <head> (título, descrição, noindex, Open Graph, fontes, tema), o resumo
// <noscript> e o robots.txt. Em dev, relê o config a cada carga da página.
function siteConfigPlugin(): Plugin {
  let server: ViteDevServer | undefined

  async function carregar(): Promise<SiteConfig> {
    if (!server) return staticConfig
    const modulo = await server.ssrLoadModule('/src/config/site.config.ts')
    return modulo.default as SiteConfig
  }

  return {
    name: 'site-config',
    configureServer(s) {
      server = s
      s.middlewares.use('/robots.txt', async (_req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(robotsTxt(await carregar()))
      })
    },
    async transformIndexHtml(html) {
      return aplicarAoHtml(html, await carregar())
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt(staticConfig),
      })
    },
    handleHotUpdate({ file, server: s }) {
      if (/[\/]src[\/]config[\/]/.test(file)) {
        s.ws.send({ type: 'full-reload' })
        return []
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteConfigPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
