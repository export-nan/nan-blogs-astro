import { defineConfig } from 'astro/config';
import path from 'path';
import vue from '@astrojs/vue';
import {remarkPlugins, rehypePlugins, vitePlugins} from './plugins'
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap(), vue()],
	markdown: {
		remarkPlugins,
		rehypePlugins
	},

	vite: {
		plugins: vitePlugins
	}
});
