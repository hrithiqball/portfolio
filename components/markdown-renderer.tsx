import Markdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { CopyButton } from '@/components/copy-button'

type MarkdownRendererProps = {
  markdown: string | undefined
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          const language = match ? match[1] : ''

          return language !== '' ? (
            <div className="relative">
              <div className="absolute top-0 left-0 rounded-tl-md rounded-br-md bg-gray-600 px-2 py-1 font-mono text-xs text-gray-200">
                {language}
              </div>
              <CopyButton value={String(children).replace(/\n$/, '')} />
              <Prism
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                  fontSize: '14px',
                  paddingTop: '2rem'
                }}
              >
                {String(children).replace(/\n$/, '')}
              </Prism>
            </div>
          ) : (
            <span
              className="rounded bg-stone-800 px-1 font-mono text-sm font-semibold text-stone-200 dark:bg-stone-800"
              {...props}
            >
              {children}
            </span>
          )
        }
      }}
    >
      {markdown}
    </Markdown>
  )
}
