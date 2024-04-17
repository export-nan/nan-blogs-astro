import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'

import rehypeStringify from 'rehype-stringify'
import {remarkMermaid} from './plugins/remark-mermaid/index.mjs'
import {remarkHint} from './plugins/remark-hint/index.mjs'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax'
import {rehypeExcerpt} from './plugins/rehype-excerpt/index.mjs'
import rehypeShiki from '@shikijs/rehype'
import {rehypeCodeBlock} from './plugins/rehype-code-block';
import {rehypeImg} from './plugins/rehype-img'; 
// import {compileAssets} from './lib/assets.async'
 
export type FileConfig = {
    rootPath: string
}


export abstract class Parser{
    core = unified()
    abstract parser(core: typeof this.core, fileConfig: FileConfig): void
    abstract compiler(core: typeof this.core, fileConfig: FileConfig): void

    async process(input: string,  fileConfig: FileConfig) {
        this.core.use(remarkParse)
        this.parser(this.core, fileConfig)
        this.core.use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeStringify)
        .use(rehypeRaw)
        this.compiler(this.core, fileConfig)
        const res = await this.core.process(input)
        // await compileAssets()
        return res
    }
}

export class CommonParser extends Parser{        
    parser(core: Parser['core']){
        core.use(remarkMermaid)
        .use(remarkHint)
        .use(remarkGfm)
        .use(remarkToc)
        .use(remarkMath)
    }
    compiler(core: Parser['core'], fileConfig: FileConfig){
        core.use(rehypeMathjax)
        .use(rehypeCodeBlock)
        .use(rehypeShiki, {
            // or `theme` for a single theme
            themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
            }
        })
        .use(rehypeImg, {rootPath: fileConfig.rootPath, outDir: './dist'})
    }
}

export class ExcerptParser extends CommonParser{
    ParagraphNumber

    constructor(ParagraphNumber: number = 5){
        super()
        this.ParagraphNumber = ParagraphNumber
    }

    parser(core: Parser['core']): void {
        super.parser(core)
        core.use(rehypeExcerpt, {ParagraphNumber: this.ParagraphNumber})
    }
}
