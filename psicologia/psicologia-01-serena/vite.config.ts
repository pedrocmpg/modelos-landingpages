import react from '@vitejs/plugin-react'
import type { Plugin, ViteDevServer } from 'vite'
import { defineConfig } from 'vitest/config'
import { aplicarAoHtml, robotsTxt } from './src/config/head.ts'
import { gerarIcones, NOMES_ICONES } from './src/config/icones.ts'
import staticConfig from './src/config/site.config.ts'
import type { SiteConfig } from './src/config/types.ts'

// Gera o que fica fora do React a partir de src/config/site.config.ts:
// <head> (título, descrição, noindex, Open Graph e Twitter, ícones, fontes, tema), o resumo
// <noscript>, o robots.txt e os ícones (favicon.svg, favicon-32.png, apple-touch-icon.png,
// desenhados com a cor primária). Em dev, relê o config a cada carga da página.
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
      s.middlewares.use(async (req, res, next) => {
        const nome = (req.url ?? '').split('?')[0].replace(/^\//, '')
        const icone = NOMES_ICONES.find((n) => n === nome)
        if (!icone) return next()
        res.setHeader('Content-Type', icone.endsWith('.svg') ? 'image/svg+xml' : 'image/png')
        res.end((await gerarIcones(await carregar()))[icone])
      })
    },
    async transformIndexHtml(html) {
      return aplicarAoHtml(html, await carregar())
    },
    async generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt(staticConfig),
      })
      const icones = await gerarIcones(staticConfig)
      for (const nome of NOMES_ICONES) {
        this.emitFile({ type: 'asset', fileName: nome, source: icones[nome] })
      }
    },
    handleHotUpdate({ file, server: s }) {
      if (file.includes('/src/config/')) {
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
