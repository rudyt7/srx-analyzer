import React, { useEffect, useState, useContext, Fragment } from "react";

import Type1 from "./Type1/Type1";
import Type2 from "./Type2/Type2";
import { FileContext } from "../../../context/FileContext";
import "./Filters.css";

const Filters = (props) => {
  const fileContext = useContext(FileContext);

  return (
    <Fragment>
      {fileContext.type === "TYPE_1" && (
        <article className="filters">
          <Type1 setFilterObject={props.setFilterObject} />
        </article>
      )}
      {fileContext.type === "TYPE_2" && (
        <article className="filters">
          <Type2 setFilterObject={props.setFilterObject} />
        </article>
      )}
    </Fragment>
  );
};

export default Filters;
