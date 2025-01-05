import React from "react";

interface ConsoleProps {
  logs: string[];
}

const Console: React.FC<ConsoleProps> = ({ logs }) => {
  return (
    <div className="console">
      <h3>Console Output</h3>
      <pre>{logs.join("\n")}</pre>
    </div>
  );
};

export default Console;
