import fs from 'fs';
import path from 'path';
import { type Classify, postTop, collectionsInfo, contentRoot} from "./config";
import { getEntry } from 'astro:content';

export const root= path.join(process.cwd(), contentRoot)

function getSlug(filePath: string){
  return path.relative(root, filePath).toLowerCase().replace(".", "")
}

export interface ContentFileInfo{
  filename: string, // 文件名称
  slug: string, // 文件相对与根目录的路径
  path: string,
  child?: ContentFileInfo[],
  [keyof: string]: any
}

// 内容根目录

// 获取目录
export async function getDirection(dirPath: string = '') {
  const classify = path.join(root, dirPath)
  function getDir(url: string, tree: ContentFileInfo[] = []){
    try{
      const list =  fs.readdirSync(url)
      list.forEach(item => {
        const fullPath = path.join(url, item)
        const stat = fs.statSync(fullPath)
        const fullSlug = path.join(url, path.basename(item, path.extname(item)))
        const data: ContentFileInfo = {
          filename: item,
          slug: getSlug(fullSlug),
          path: fullPath,
        }
        if(stat.isDirectory()){
          data.child = getDir(fullPath);
          (data.child.length>0) && tree.push(data)
        }else if(item.endsWith('.md')){
          tree.push(data)
        }
      })
    }catch(e){
      console.error(e)
    }
    return tree
  }
  return getDir(classify)
}

// 获取文章列表
export function getPostList(dirPath: string = '') {
  const classify = path.join(root, dirPath)
  let postTopList: ContentFileInfo[] = [];
  let postList:ContentFileInfo[] = [];
  (function getDir(url: string){
    try{
      const list =  fs.readdirSync(url)
      list.forEach(item => {
        const fullPath = path.join(url, item)
        const stat = fs.statSync(fullPath)
        const fullSlug = path.join(url, path.basename(item, path.extname(item)))
        const fileInfo: ContentFileInfo = {
          filename: item,
          slug: getSlug(fullSlug),
          date: stat.mtime,
          path: fullPath,
        }
        if(stat.isDirectory()){
          const child = getDir(fullPath);
        }else if(item.endsWith('.md')){
          if(postTop.find(post => fileInfo.slug.startsWith(post))){
            postTopList.push(fileInfo)
          }else{
            postList.push(fileInfo)
          }
        }
      })
    }catch(e){
      console.error(e)
    }
  })(classify)
  postTopList.sort((a, b) => (new Date(b.date)).getTime() - (new Date(b.date)).getTime())
  postList.sort((a, b) => (new Date(b.date)).getTime() - (new Date(b.date)).getTime())
  return [...postTopList, ...postList]
}

// 获取文章
export async function getPost(dirPath: string) {
  const pathItem = dirPath.split('/')
  const classify = pathItem.shift() as Classify;
  return await getEntry(classify, pathItem.join('/'));
}

// 获取collections列表
export function getCollections() {
  return collectionsInfo
}