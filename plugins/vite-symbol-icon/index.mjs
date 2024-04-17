import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路径地址
let indexPath = null,
    iconsPath = null;

// 收集icon路径
function collectIconPath() {
  const files = fs.readdirSync(iconsPath);
  const fileList = [];
  files.forEach((filePath) => {
    const stat = fs.statSync(`${iconsPath}/${filePath}`);
    if (stat.isFile) {
      // 如果是文件就加入到队列中
      fileList.push(filePath);
    } 
  })
  return fileList;
}

// 将 icon 写入到 symbol
function writeIconToSymbol(fileList) {
  let content = '<svg>';

  fileList.forEach((filePath) => {
    // 获取文件的名称
    const fileName = filePath.split('.')[0];

    let fileContent = fs.readFileSync(`${iconsPath}/${filePath}`, 'utf-8');
    // 获取 viewBox
    const viewBoxRegex = /viewBox="([^"]*)"/;
    const match = fileContent.match(viewBoxRegex);
    let viewBoxValue = match ? match[1] : '0 0 512 512'; 
    // 去除最外层的<svg></svg>
    fileContent = fileContent.replace(/<svg.*?>/, '');
    fileContent = fileContent.replace(/<\/svg>/, '');

    // 加上<symbol>
    fileContent = `<symbol id="${fileName}" viewBox="${viewBoxValue}">${fileContent}</symbol>`

    content += fileContent;
  })

  content += '</svg>';

  // 应用模版
  let template = fs.readFileSync(path.join(__dirname, './template.mjs'), 'utf-8');
  template = template.replace('<!---template--->', content);
  fs.writeFileSync(indexPath, template, 'utf-8');
}



/**
 * options:
 *  path = 项目引入的路径
 *  lib =  icon 库的路径
*/
export default function viteSymbolIcon(options) {
  indexPath = path.join(options.root, options.path);
  iconsPath = path.join(options.root, options.lib);

  return {
    name: 'vite-symbol-icon',
    // Vite 插件的配置
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if(options.path===req.url){
          const fileList = collectIconPath();
          writeIconToSymbol(fileList);
        }
        // 在请求到达服务器之前执行的中间件逻辑
        next();
      });
    },
  };
}