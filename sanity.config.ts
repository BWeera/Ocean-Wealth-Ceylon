import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './sanity/schema'
import { projectId, dataset } from './sanity/env'
import { StudioNavbar } from './src/components/StudioNavbar'

export default defineConfig({
  name: 'ocean-wealth-ceylon',
  title: 'Ocean Wealth Ceylon',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),
  ],
  studio: {
    components: {
      navbar: StudioNavbar,
    }
  }
})
