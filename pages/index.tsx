import React, { useState } from "react";
import Editor from "../components/Editor";
import ReactPreview from "../components/ReactPreview";
import Preview from "../components/Preview";

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState<"html" | "react">("html");

  // For HTML, CSS, JS
  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [css, setCss] = useState("body { font-family: Arial; }");
  const [js, setJs] = useState("console.log('Hello, Console!');");

  // For React JSX
  const [jsx, setJsx] = useState(`
    const App = () => (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
    render(<App />);
  `);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <button onClick={() => setActiveTab("html")}>HTML/CSS/JS</button>
        <button onClick={() => setActiveTab("react")}>React JSX</button>
      </div>

      {activeTab === "html" && (
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "10px" }}>
            <h3>HTML</h3>
            <Editor value={html} language="html" onChange={setHtml} />
            <h3>CSS</h3>
            <Editor value={css} language="css" onChange={setCss} />
            <h3>JS</h3>
            <Editor value={js} language="javascript" onChange={setJs} />
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
            <h3>Preview</h3>
            <Preview html={html} css={css} js={js} />
          </div>
        </div>
      )}

      {activeTab === "react" && (
        <div>
          <ReactPreview code={jsx} />
          <Editor value={jsx} language="javascript" onChange={setJsx} />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
