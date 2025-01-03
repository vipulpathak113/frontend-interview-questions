import React, { useEffect, useRef } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <style>${css}</style>
          </head>
          <body>${html}</body>
          <script>${js}</script>
          </html>
        `);
        doc.close();
      }
    }
  }, [html, css, js]);

  return <iframe ref={iframeRef} style={{ width: "100%", height: "500px", border: "none" }} />;
};

export default Preview;
