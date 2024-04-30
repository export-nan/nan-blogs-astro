import { visit, SKIP} from 'unist-util-visit'
import type { Root, Element, } from 'hast'
import { join as pathJoin, basename as pathBasename, extname as pathExtname } from 'path'
import { readFileSync, writeFileSync, mkdirSync, existsSync} from 'fs'
import {addAssets} from '../../lib/assets.async'
import sharp from 'sharp'

const base64urlCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const base64urlMap: Record<string, number> = {};
(base64urlCode.match(/.{1,1}/g) as string[]).forEach(function (v: string, i: number){
  base64urlMap[v] = i
})
function base64urlCompute(char1: string, char2: string) {
  const numberA = base64urlMap[char1]
  const numberB = base64urlMap[char2]
  // console.log(char1, char2, numberA, numberB, (numberA * numberB) % 64)
  return base64urlCode[(numberA + numberB) % 64]
}

function toName(fileBuffer: Buffer): string{
  const fileBase64url = fileBuffer.toString('base64url')
  const strBlock = fileBase64url.match(/.{1,8}/g) as string[] || [fileBase64url]
  const str = strBlock.reduce((prev, curr)=>{
    const chars = prev.match(/.{1,1}/g) as string[]
    const inners = chars.map((v,k)=>{
      return curr[k] === undefined ? v : base64urlCompute(v,curr[k])
    }).join('')
    return inners
  })
  return str;
}


const fileMap = new Map()
function optimizeImg(src: string, outDir: string){
  if(fileMap.has(src)){
    return fileMap.get(src)
  }

  const extname = pathExtname(src)
  const basename = pathBasename(src, extname)
  const isToWebp = /\.(png|jpe?g)$/i.test(extname)
  const file = readFileSync(src)
  const outFilename = `${basename}.${toName(file)}${isToWebp ? '.webp' : extname}` 
  const outPath = pathJoin(outDir, outFilename)
  fileMap.set(src, outFilename)
  if(!existsSync(outDir)){
    mkdirSync(outDir)
  }

  // 异步编译文件
  async function compress(){
    try{
      const sharpImg = sharp(src)
      const image = await sharpImg.resize(1920).webp({quality: 75}).toBuffer()
      writeFileSync(outPath, image)
    }catch(e){
      console.error(e)
    }
  }
  addAssets(compress())
  return outFilename
}

export function rehypeImg(options: {rootPath: string, outDir: string}) {
  const assetPath= '/assets'
  const outRoot = pathJoin(process.cwd(), options.outDir) 
  const assetOutDir = pathJoin(outRoot, assetPath) 
  return function (tree: Root) {
    visit(tree, 'element', function (node: Element) {
      if(node.tagName === 'img'){
        if(typeof node.properties.src === 'string'){
          const src = pathJoin(options.rootPath, node.properties.src)
          if(process.env.NODE_ENV=='production'){
            const outFilename = optimizeImg(src, assetOutDir)
            node.properties.src = pathJoin(assetPath, outFilename)
          }else{
            const href = `/@fs${src}?origFormat=png`
            const f = 'webp'
            node.properties.src = '/_image?href=' + href + '&f=' + f
          }
          return SKIP
        }
      }
    })
  }
}
