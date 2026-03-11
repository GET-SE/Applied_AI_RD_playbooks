import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Renders a string that may contain inline LaTeX delimited by $...$.
 * Non-math segments are rendered as plain text.
 */
const MathText: React.FC<{ text: string }> = ({ text }) => {
  // Split on $...$ — odd indices are LaTeX, even indices are plain text
  const parts = text.split(/\$([^$]+)\$/);

  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) {
          // Plain text segment
          return part ? <React.Fragment key={i}>{part}</React.Fragment> : null;
        }
        // LaTeX segment
        try {
          const html = katex.renderToString(part, {
            throwOnError: false,
            displayMode: false,
            output: 'html',
          });
          return (
            <span
              key={i}
              className="math-inline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          // Fallback: show raw if KaTeX fails
          return <code key={i}>${part}$</code>;
        }
      })}
    </>
  );
};

export default MathText;
