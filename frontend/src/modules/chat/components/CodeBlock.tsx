import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ inline, className, children }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  if (!inline && match) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] text-sm text-gray-300">
          <span>{language.toUpperCase()}</span>
        </div>

        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "12px",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="bg-gray-800 px-1 py-0.5 rounded">
      {children}
    </code>
  );
};

export default CodeBlock;