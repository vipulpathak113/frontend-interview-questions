import { useState, useEffect, useCallback } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ReactPreview from "@/components/ReactPreview";
import Console from "@/components/Console";

const IndexPage = () => {
  const [mode, setMode] = useState<"html" | "react">("html");
  const [activeTab, setActiveTab] = useState("html");
  const [activePreviewTab, setActivePreviewTab] = useState<
    "preview" | "console"
  >("preview");

  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [css, setCss] = useState("body { font-family: Arial; }");
  const [js, setJs] = useState("console.log('Hello from JS!');");

  const [jsx, setJsx] = useState(`
    const App = () => {
      console.log('Hello from React App!');
      return <h1>Hello, React!</h1>;
    };
    render(<App />);
  `);

  const [htmlLogs, setHtmlLogs] = useState<string[]>([]);
  const [reactLogs, setReactLogs] = useState<string[]>([]);

  useEffect(() => {
    // Clear logs on mode switch
    if (mode === "html") {
      setHtmlLogs([]);
    } else {
      setReactLogs([]);
    }
    setActivePreviewTab("preview"); // Always reset to preview tab
  }, [mode]);

  const handleTabChange = useCallback((tab: "preview" | "console") => {
    setActivePreviewTab(tab);
  }, []);

  return (
    <div className="container">
      {/* Dropdown */}
      <div className="header">
        <label htmlFor="mode-select" className="dropdown-label">
          Select Mode
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as "html" | "react")}
          className="dropdown-select"
        >
          <option value="html">HTML, CSS, JS</option>
          <option value="react">React(JSX)</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Editor */}
        {mode === "html" ? (
          <div className="editor-container">
            <div className="tabs">
              <button
                onClick={() => setActiveTab("html")}
                className={`tab-button ${activeTab === "html" ? "active" : ""}`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab("css")}
                className={`tab-button ${activeTab === "css" ? "active" : ""}`}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab("js")}
                className={`tab-button ${activeTab === "js" ? "active" : ""}`}
              >
                JS
              </button>
            </div>
            <div className="editor">
              {activeTab === "html" && (
                <Editor value={html} language="html" onChange={setHtml} />
              )}
              {activeTab === "css" && (
                <Editor value={css} language="css" onChange={setCss} />
              )}
              {activeTab === "js" && (
                <Editor value={js} language="javascript" onChange={setJs} />
              )}
            </div>
          </div>
        ) : (
          <div className="react-editor">
            <Editor value={jsx} language="javascript" onChange={setJsx} />
          </div>
        )}

        {/* Preview and Console */}
        <div className="output-container">
          <div className="preview-tabs">
            <button
              onClick={() => handleTabChange("preview")}
              className={`tab-button ${
                activePreviewTab === "preview" ? "active" : ""
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => handleTabChange("console")}
              className={`tab-button ${
                activePreviewTab === "console" ? "active" : ""
              }`}
            >
              Console
            </button>
          </div>

          <div className="output-content">
            {activePreviewTab === "preview" ? (
              mode === "html" ? (
                <Preview
                  html={html}
                  css={css}
                  js={js}
                  setConsoleLogs={setHtmlLogs}
                />
              ) : (
                <ReactPreview code={jsx} setConsoleLogs={setReactLogs} />
              )
            ) : (
              <Console logs={mode === "html" ? htmlLogs : reactLogs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
