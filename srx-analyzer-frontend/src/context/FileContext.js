import React from "react";

export const FileContext = React.createContext({
  fileName: null,
  logs: null,
  type: null,
  setFile: () => {},
  setLogs: () => {},
  setType: () => {},
});
