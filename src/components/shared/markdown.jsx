import clsx from "clsx";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useRef, useState } from "react";

export default function Markdown({ content, clamp = false }) {
  const [isLong, setIsLong] = useState(false);

  const markdown = useRef(null);

  const htmlContent = DOMPurify.sanitize(marked.parse(content));

  useEffect(() => {
    // max-height
    if (markdown.current.offsetHeight > 199) {
      setIsLong(true);
    }
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      ref={markdown}
      className={clsx(
        "prose prose-neutral max-w-none overflow-auto prose-a:link-primary",
        { "line-clamp": clamp },
        { mask: clamp && isLong }
      )}
    ></div>
  );
}
