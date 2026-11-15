import ReactMarkdown from 'react-markdown';
import { markdownContentStyles } from '@/modules/legal/recipes/markdownContent.recipe';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const className = markdownContentStyles();

  return (
    <div className={className}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
