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
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '')
          const language = match ? match[1] : ''

          return !inline && language ? (
            <div className="relative">
              <div className="absolute top-0 left-0 bg-gray-600 text-gray-200 px-2 py-1 text-xs rounded-tl-md rounded-br-md font-mono">
                {language}
              </div>
              <CopyButton value={String(children).replace(/\n$/, '')} />
              <Prism
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                  borderRadius: '6px',
                  fontSize: '14px',
                  paddingTop: '2rem'
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </Prism>
            </div>
          ) : (
            <span
              className="bg-stone-100 dark:bg-stone-800 rounded px-1 font-mono font-semibold text-sm"
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
