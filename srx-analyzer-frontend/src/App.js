import React, { useState } from "react";

import { FileContext } from "./context/FileContext";
import UploadLogs from "./components/UploadLogs/UploadLogs";
import DisplayLogs from "./components/DisplayLogs/DisplayLogs";

import "./App.css";

function App() {
  const [file, setfile] = useState("");
  const [logs, setLogs] = useState("");
  const [type, setType] = useState("");

  const setFileHandler = (file) => {
    setfile(file);
  };

  const setLogsHandler = (logs) => {
    setLogs(logs);
  };

  const setTypeHandler = (type) => {
    setType(type);
  };

  const appJSX = (
    <main className="App">
      <div className="header__main">
        <h1>SRX Analyzer</h1>
      </div>
      <UploadLogs />
      <DisplayLogs />
    </main>
  );

  return (
    <FileContext.Provider
      value={{
        fileName: file,
        logs: logs,
        type: type,
        setFile: setFileHandler,
        setLogs: setLogsHandler,
        setType: setTypeHandler,
      }}
    >
      {appJSX}
    </FileContext.Provider>
  );
}

export default App;
