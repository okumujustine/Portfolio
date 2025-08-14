import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CodeBlock = ({ inline, className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  return !inline && match ? (
    <SyntaxHighlighter
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={vscDarkPlus as any}
      language={language}
      PreTag="div"
      customStyle={{
        margin: '1.5rem 0',
        borderRadius: '4px',
        fontSize: '0.9rem',
        lineHeight: '1.5'
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className="inline-code">
      {children}
    </code>
  );
};
