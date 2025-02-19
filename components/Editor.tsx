import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface LocalEditorProps {
  value: string;

  language: string;

  onChange: (value: string) => void;
}

const Editor: React.FC<LocalEditorProps> = ({ value, language, onChange }) => {
  return (
    <MonacoEditor
      height="500px"
      defaultLanguage={language}
      value={value}
      onChange={(value) => onChange(value || "")}
      theme="vs-dark"
    />
  )
};

export default Editor;
