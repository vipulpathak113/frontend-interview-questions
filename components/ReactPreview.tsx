import React, { useEffect } from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";

interface ReactPreviewProps {
  code: string;
  setConsoleLogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReactPreview: React.FC<ReactPreviewProps> = ({ code, setConsoleLogs }) => {
  useEffect(() => {
    const originalLog = console.log;

    // Intercept console.log
    console.log = (...args: any[]) => {
      setConsoleLogs(() => [args.join(" ")]);
      originalLog(...args); // Still log to the browser console
    };

    return () => {
      // Restore original console.log on cleanup
      console.log = originalLog;
    };
  }, [setConsoleLogs]);

  return (
    <LiveProvider code={code} noInline>
      <div style={{ border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden" }}>
        <div style={{ padding: "10px", backgroundColor: "#f5f5f5", color: "#000" }}>
          <LivePreview />
        </div>
        <div style={{ padding: "10px", backgroundColor: "#ffdddd", color: "#d00" }}>
          <LiveError />
        </div>
      </div>
    </LiveProvider>
  );
};

export default ReactPreview;
