import React from "react";

interface ConsoleProps {
  logs: string[];
}

const Console: React.FC<ConsoleProps> = ({ logs }) => {
  return (
    <div className="console">
      <pre>{logs.join("\n")}</pre>
    </div>
  );
};

export default Console;
