import React, { useState } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import ReactPreview from "../components/ReactPreview"; // Import the React preview component

const IndexPage = () => {
  const [mode, setMode] = useState<"html" | "react">("html"); // Dropdown selection state
  const [activeTab, setActiveTab] = useState("html"); // Active tab for HTML/CSS/JS editor

  // State for HTML, CSS, JS Editor
  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [css, setCss] = useState("body { font-family: Arial; }");
  const [js, setJs] = useState("console.log('Hello, Console!');");

  // State for React Editor
  const [jsx, setJsx] = useState(`
    const App = () => (
      <div>
        <h1>Hello, React!</h1>
      </div>
    );
    render(<App />);
  `);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header with Dropdown */}
      <div style={{ padding: "10px", backgroundColor: "#282c34", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Code Playground</h1>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "html" | "react")}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          <option value="html">HTML, CSS, JS</option>
          <option value="react">React (JSX)</option>
        </select>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* HTML/CSS/JS Editor Mode */}
        {mode === "html" && (
          <div style={{ width: "50%", display: "flex", flexDirection: "column", borderRight: "1px solid #ccc" }}>
            {/* Tabs */}
            <div style={{ display: "flex", backgroundColor: "#f5f5f5", borderBottom: "1px solid #ccc" }}>
              <button
                onClick={() => setActiveTab("html")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  backgroundColor: activeTab === "html" ? "#fff" : "#f5f5f5",
                  cursor: "pointer",
                  fontWeight: activeTab === "html" ? "bold" : "normal",
                }}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab("css")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  backgroundColor: activeTab === "css" ? "#fff" : "#f5f5f5",
                  cursor: "pointer",
                  fontWeight: activeTab === "css" ? "bold" : "normal",
                }}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab("js")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  backgroundColor: activeTab === "js" ? "#fff" : "#f5f5f5",
                  cursor: "pointer",
                  fontWeight: activeTab === "js" ? "bold" : "normal",
                }}
              >
                JS
              </button>
            </div>

            {/* Editors */}
            <div style={{ flex: 1, overflow: "auto" }}>
              {activeTab === "html" && <Editor value={html} language="html" onChange={setHtml} />}
              {activeTab === "css" && <Editor value={css} language="css" onChange={setCss} />}
              {activeTab === "js" && <Editor value={js} language="javascript" onChange={setJs} />}
            </div>
          </div>
        )}

        {/* React (JSX) Editor Mode */}
        {mode === "react" && (
          <div style={{ width: "50%", padding: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>React Editor (JSX)</h3>
            <Editor value={jsx} language="javascript" onChange={setJsx} />
          </div>
        )}

        {/* Preview Section */}
        <div style={{ width: "50%", padding: "10px", backgroundColor: "#fff" }}>
          <h3 style={{ margin: 0, borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>Live Preview</h3>
          {mode === "html" ? (
            <Preview html={html} css={css} js={js} />
          ) : (
            <ReactPreview code={jsx} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
