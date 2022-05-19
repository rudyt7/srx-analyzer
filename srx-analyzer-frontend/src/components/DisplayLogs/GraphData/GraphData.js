import React, { useContext } from "react";

import Type1 from "./Type1/Type1";
import Type2 from "./Type2/Type2";
import { FileContext } from "../../../context/FileContext";
import "./GraphData.css";

const GraphData = () => {
  const fileContext = useContext(FileContext);

  return (
    <article className="graph__logs">
      {fileContext.type === "TYPE_1" && <Type1 />}
      {fileContext.type === "TYPE_2" &&
        fileContext.sessionType === "close" &&
        fileContext.sessionLoaded && <Type2 />}
    </article>
  );
};

export default GraphData;
