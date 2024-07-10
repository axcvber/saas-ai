import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './code-block'

const CodeSnippet: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '')
          const isCodeBlock = !!match
          return isCodeBlock ? (
            <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
          ) : (
            <code className={'bg-black/5 rounded-sm p-1'} {...props}>
              {children}
            </code>
          )
        },
      }}
      className='text-sm overflow-hidden leading-7'
    >
      {content}
    </ReactMarkdown>
  )
}

export default CodeSnippet
