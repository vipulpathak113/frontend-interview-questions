import React from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";

interface ReactPreviewProps {
  code: string;
  scope?: Record<string, unknown>;
}

const ReactPreview: React.FC<ReactPreviewProps> = ({ code, scope = {} }) => {
  return (
    <LiveProvider code={code} scope={scope} noInline>
      <div style={{ border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden" }}>
        <div style={{ padding: "10px", backgroundColor: "#f5f5f5", color: "#000" }}>
          <h3>Live Preview</h3>
          <LivePreview />
        </div>
        <div style={{ padding: "10px", backgroundColor: "#ffdddd", color: "#d00" }}>
          <h3>Errors</h3>
          <LiveError />
        </div>
      </div>
    </LiveProvider>
  );
};

export default ReactPreview;
