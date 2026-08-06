import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="markdown-body font-sans text-gray-800 antialiased">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 border-b-2 border-[#DC2626] pb-2 mt-8 mb-4 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-200 text-[#DC2626] tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed my-3 font-normal">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-4 space-y-2 text-sm sm:text-base text-gray-800 bg-gray-50/80 p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-4 space-y-2 text-sm sm:text-base text-gray-800 bg-gray-50/80 p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed marker:text-[#DC2626] marker:font-bold">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 p-4 sm:p-5 bg-red-50/80 border-l-4 border-[#DC2626] rounded-r-2xl text-xs sm:text-sm text-gray-900 font-medium leading-relaxed shadow-xs">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gradient-to-r from-red-900 via-gray-900 to-red-950 text-white font-bold">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-white border-b border-red-800">
              {children}
            </th>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-200 bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-red-50/40 transition-colors odd:bg-white even:bg-gray-50/60">
              {children}
            </tr>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-gray-800 border-t border-gray-100 whitespace-normal leading-normal font-medium">
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900 bg-amber-100/70 px-1.5 py-0.5 rounded text-amber-950">
              {children}
            </strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC2626] underline font-bold hover:text-red-800 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-8 border-gray-200" />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
