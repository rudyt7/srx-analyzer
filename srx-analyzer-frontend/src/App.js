import React, { useState } from "react";

import { FileContext } from "./context/FileContext";
import UploadLogs from "./components/UploadLogs/UploadLogs";
import DisplayLogs from "./components/DisplayLogs/DisplayLogs";

import "./App.css";

function App() {
  const [file, setfile] = useState("");
  const [logs, setLogs] = useState("");
  const [type, setType] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const setFileHandler = (file) => {
    setfile(file);
  };

  const setLogsHandler = (logs) => {
    setLogs(logs);
  };

  const setTypeHandler = (type) => {
    setType(type);
  };

  const setSessionTypeHandler = (sessionType) => {
    setSessionType(sessionType);
  };

  const setSessionLoadedHandler = (sessionStatus) => {
    setSessionLoaded(sessionStatus);
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
        sessionType: sessionType,
        sessionLoaded: sessionLoaded,
        setFile: setFileHandler,
        setLogs: setLogsHandler,
        setType: setTypeHandler,
        setSessionType: setSessionTypeHandler,
        setSessionLoaded: setSessionLoadedHandler,
      }}
    >
      {appJSX}
    </FileContext.Provider>
  );
}

export default App;
