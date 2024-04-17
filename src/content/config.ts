import { z, defineCollection } from 'astro:content';
 

const config = {
  root: '/src/content/',
  collections: {
    'note': {
      title: '笔记',
      // schema: z.object({
      //   title: z.string(),
      //   date: z.date(),
      // })
    },
    'site-log': {
      title: '建站日志',
      // schema: z.object({
      //   title: z.string(),
      // })
    }
  },
  postTop: [
    'site-log',
  ],
  pagination: {
    lengthPerPage: 5
  }
}


export const collections:Record<string, any> = {};
export const collectionsInfo:{name: string, title: string}[] = [];
Object.keys(config.collections).forEach((key) => {
  // @ts-ignore
  const {title, ...collection} = config.collections[key];
  collections[key] = defineCollection(collection);
  collectionsInfo.push({name: key, title});
})
export const postTop = config.postTop || []
export const contentRoot = config.root || '/src/content/';

export type Classify = keyof typeof config.collections;