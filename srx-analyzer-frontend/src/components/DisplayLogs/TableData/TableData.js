import React, { Fragment, useContext } from "react";

import Type1 from "./Type1/Type1";
import Type2 from "./Type2/Type2";
import { FileContext } from "../../../context/FileContext";

import "./TableData.css";

const TableData = () => {
  const fileContext = useContext(FileContext);

  return (
    <article className="table__logs">
      {fileContext.type === "TYPE_1" && <Type1 />}
      {fileContext.type === "TYPE_2" && <Type2 />}
    </article>
  );
};

export default TableData;
