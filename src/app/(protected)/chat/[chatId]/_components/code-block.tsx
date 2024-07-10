'use client'

import { Check, Copy } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }, [value])

  return (
    <div className='relative'>
      <SyntaxHighlighter style={dracula} language={language} PreTag='div'>
        {value}
      </SyntaxHighlighter>
      <button
        onClick={copyToClipboard}
        className='absolute top-2 right-2  p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors'
      >
        {isCopied ? <Check className='h-4 w-4 text-gray-300' /> : <Copy className='h-4 w-4 text-gray-300' />}
      </button>
    </div>
  )
}

export default CodeBlock
