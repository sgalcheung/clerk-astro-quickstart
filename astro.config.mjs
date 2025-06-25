import { defineConfig } from 'astro/config'
import clerk from '@clerk/astro'

import netlify from '@astrojs/netlify'

export default defineConfig({
  integrations: [clerk()],
  adapter: netlify(),
  output: 'server',
})
