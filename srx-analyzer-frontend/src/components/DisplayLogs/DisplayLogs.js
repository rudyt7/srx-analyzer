import React, { useState, useContext } from "react";

import { FileContext } from "../../context/FileContext";
import TableData from "./TableData/TableData";
import GraphData from "./GraphData/GraphData";

import "./DisplayLogs.css";

const DisplayLogs = () => {
  const fileContext = useContext(FileContext);

  return (
    <section className="display__logs">
      {fileContext.fileName && <GraphData />}
      {fileContext.fileName && <TableData />}
    </section>
  );
};

export default DisplayLogs;
