import { visit, SKIP} from 'unist-util-visit'
import type { Root, Element, } from 'hast'
import { join as pathJoin, basename as pathBasename, extname as pathExtname } from 'path'
// import { readFileSync, writeFileSync, mkdirSync, existsSync} from 'fs'
// // import {addAssets} from '../../lib/assets.async'
// import md5 from 'crypto-js/md5'

// import { ImagePool } from '@squoosh/lib';
// import { cpus } from 'os';
// const imagePool = new ImagePool(cpus().length);


// const fileMap = new Map()

// function optimizeImg(src: string, outDir: string){
//   if(fileMap.has(src)){
//     return fileMap.get(src)
//   }

//   // const extname = pathExtname(src)
//   // const basename = pathBasename(src, extname)
//   // const isToWebp = /\.(png|jpe?g)$/i.test(extname)
//   // const MD5 = md5(src).toString();
//   // const outname = `${basename}.${MD5}${isToWebp ? '.webp' : extname}` 
//   // const outPath = pathJoin(outDir, outname)
//   // fileMap.set(src, outPath)

//   // // 异步编译文件
//   // async function compress(){
//   //   const maxWidth = 1920
//   //   const file = readFileSync(src)
//   //   const image = imagePool.ingestImage(file);
//   //   const {bitmap} = await image.decoded
//   //   let {width, height} = bitmap
//   //   const ratio = width/maxWidth
//   //   await image.preprocess({resize: {width: maxWidth, height: height/ratio}})
    
//   //   const imageResult = await image.encode({
//   //     mozjpeg: 'auto',
//   //     webp: outname?{quality: 70}:undefined,
//   //   });

//   //   if(!existsSync(outDir)){
//   //     mkdirSync(outDir)
//   //   }
//   //   const data = await image.decoded
//   //   writeFileSync(outPath, data.bitmap.data)
//   // }  
//   // addAssets(compress)

//   return "outPath"
// }

export function rehypeImg(options: {rootPath: string, outDir: string}) {
  const assetPath= '/assets'
  const outRoot = pathJoin(process.cwd(), options.outDir) 
  const assetOutDir = pathJoin(outRoot, assetPath) 
  return function (tree: Root) {
    visit(tree, 'element', function (node: Element, index, parent) {
      if(node.tagName === 'img'){
      
        // if(typeof node.properties.src === 'string'){
        //   const src = pathJoin(options.rootPath, node.properties.src)
        //   if(process.env.NODE_ENV=='production'){
        //     // const outPath = optimizeImg(src, assetOutDir)
        //     const fileName = 'asss'
        //     node.properties.src = pathJoin(assetPath, fileName)
        //   }else{
        //     const href = `/@fs${src}?origFormat=png`
        //     const f = 'webp'
        //     node.properties.src = '/_image?href=' + href + '&f=' + f
        //   }
        //   return SKIP
        // }
      }
    })
  }
}
