import rss from '@astrojs/rss';

import consts from '../consts';
import { getPostList } from '../content/postsApi';
const siteInfo = consts.siteInfo;

export async function GET(context) {
	const posts = await getPostList();	
	return rss({
		title: siteInfo?.title||'NAN Blog',
		description:  siteInfo?.description||'Welcome to my website!',
		site: context.site,
		items: posts.map((post) => {
			return {
				pubDate: post.date,
				link: `/post/${post.slug}`,
			 }
		}),
	})
}
