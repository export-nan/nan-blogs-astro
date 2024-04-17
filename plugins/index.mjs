import { fileURLToPath } from 'url';
import path, { join } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// vite
import viteSymbolIcon from './vite-symbol-icon'

export const remarkPlugins = [
  
]

export const rehypePlugins = [
]

export const vitePlugins = [
  viteSymbolIcon({
    root: path.join(__dirname, '../'),
    path: '/src/assets/iconfont/index.js',
    lib: '/src/assets/iconfont/icons',
  })
]