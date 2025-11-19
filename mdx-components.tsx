import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./app/components/CodeBlock"; // if using copy button

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="text-4xl font-main font-bold mt-8" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-3xl font-main font-semibold mt-6" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-2xl font-blog-body font-semibold mt-4" {...props} />
    ),
    h4: (props) => (
      <h4 className="text-xl font-blog-body font-semibold mt-4" {...props} />
    ),
    p: (props) => (
      <p className="text-[1.15rem] leading-relaxed my-4 font-blog-body" {...props} />
    ),

    ul: (props) => (
      <ul className="list-disc ml-6 my-4 font-blog-body" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal ml-6 my-4 font-blog-body" {...props} />
    ),

    li: (props) => <li className="my-1" {...props} />,

    hr: (props) => <hr className="my-10 border-t border-white/10" {...props} />,

    code: (props) => (
      <code
        className="bg-card-bg p-1 rounded text-sm font-blog-code"
        {...props}
      />
    ),
    pre: (props) => <CodeBlock {...props} />,

    ...components,
  };
}
