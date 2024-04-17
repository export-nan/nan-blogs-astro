---
title: vuepress + Github actions 搭建自动化的集成的博客发布栈
tag:
    - vuepress
    - markdown
# category:
#     - 博客维护
# 这是页面的图标
# icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: NAN
# 设置写作时间
date: 2023-02-13
# 此页面会在文章列表置顶
sticky: true1
# 此页面会出现在文章收藏中
star: true

# 你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。
# 导航栏
# navbar: false
# 侧边栏
# sidebar: false
# 路径导航
# breadcrumb: false
# 页面信息
# pageInfo: false
# 贡献者
# contributors: false
# 编辑此页链接
# editLink: false
# 更新时间
# lastUpdated: false
# 上一篇/下一篇 链接
# prev: false
# next: false
# 评论
# comment: false
# 页脚
# footer: false
# 返回顶部按钮
# backtotop: false
---
## 站点技术选型

技术栈

- markdown
- vuepress
- Github pase
- Github actions

思路：博客文档部分采用 `markdown` 进行编写，将github仓库作为我们的文章数据源，使用 `vuepress` 对文章进行静态文件编译，采用 `vuepress-theme-hope` 进行主题开发，借助 `Github actions` 进行自动化部署。

为什么是 `markdown`？ 拜托！`markdown` 真的超好用的好吧，我真的爱死mardown了_(:з」∠)_

采用`vuepress`编译为静态文件的好处: 首先我们只编写 markdown 文件并 push 到git远端上，这样保证了我们文档笔记的安全性，你也不想你写了很久的笔记因为服务器到期或者其他原因突然离你而去对吧？而且这样我们不用考虑后端交互，只专注于 `markdown` 文档编写,`vuepress`会帮我搞定一切，并且因为最终编译为静态文件这便于了我们网站在SEO方面的优化，最后我们只要配置好我们的`Github actions`我们就可以很方便的对我们的博客内容进行推送

## 站点规划
- [x] 基于`docker`自动发布到`阿里云`
- [x] 基于`Github actions`自动发布到`Github page`
- [x] 建站

## 源码地址
Github URl: [*https://github.com/export-nan/nan-blogs*](https://github.com/export-nan/nan-blogs)

## 技术栈相关
vuepress: [https://v2.vuepress.vuejs.org/zh/](https://v2.vuepress.vuejs.org/zh/)

vuepress-theme-hope: [https://theme-hope.vuejs.press/zh/](https://theme-hope.vuejs.press/zh/)

Github pase: [https://docs.github.com](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

markdown: [markdown 教程](https://commonmark.org/help/)
