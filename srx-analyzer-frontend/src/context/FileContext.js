import React from "react";

export const FileContext = React.createContext({
  fileName: null,
  logs: null,
  type: null,
  sessionType: null,
  sessionLoaded: false,
  setFile: () => {},
  setLogs: () => {},
  setType: () => {},
  setSessionType: () => {},
  setSessionLoaded: () => {},
});
