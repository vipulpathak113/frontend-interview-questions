import React, { useEffect, useRef } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
  setConsoleLogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js, setConsoleLogs }) => {
  const iframeRef =useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        const overrideConsoleLog = `
          (function() {
            const originalLog = console.log;
            console.log = function(...args) {
              window.parent.postMessage({ type: 'log', args });
              originalLog.apply(console, args);
            };
          })();
        `;

        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <style>${css}</style>
          </head>
          <body>${html}</body>
          <script>${overrideConsoleLog}</script>
          <script>${js}</script>
          </html>
        `);
        doc.close();
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "log") {
          setConsoleLogs(() => [event.data.args.join(" ")]);
        }
      };

      window.addEventListener("message" , handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [html, css, js, setConsoleLogs]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "500px", border: "none" }}
    />
  );
};

export default Preview;
