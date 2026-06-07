import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/slug";

function headingText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (children && typeof children === "object" && "props" in (children as never)) {
    // @ts-expect-error - duyệt children lồng nhau
    return headingText(children.props?.children);
  }
  return "";
}

export function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-brand max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-h2:text-2xl prose-h3:text-xl prose-a:font-medium prose-a:underline-offset-2 prose-img:rounded-2xl prose-blockquote:rounded-r-2xl prose-blockquote:bg-gold-50/50 prose-blockquote:py-1 prose-blockquote:not-italic">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={slugify(headingText(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={slugify(headingText(children))}>{children}</h3>,
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
