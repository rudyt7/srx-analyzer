import React, { useState, useEffect, useContext } from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

import { FileContext } from "../../context/FileContext";
import File from "./File/File";
import Filters from "./Filters/Filters";

import "./UploadLogs.css";

const UploadLogs = () => {
  const fileContext = useContext(FileContext);

  const [numberOfData, setNumberOfData] = useState(0);
  const [filterObject, setFilterObject] = useState({
    sourceIp: false,
    destinationIp: false,
    sourcePort: false,
    destinationPort: false,
    policy: false,
    protocol: false,
    interface: false,
    packet: false,
    bytes: false,
  });

  const uploadFileHanlder = (file) => {
    if (file === null || numberOfData === 0) {
      return;
    }

    const data = new FormData();
    data.append("name", "logFile");

    if (!fileContext.fileName) {
      data.append("file", file);
    } else {
      data.append("fullPath", JSON.stringify(fileContext.fileName));
    }

    data.append("filters", JSON.stringify(filterObject));
    data.append("numberOfData", numberOfData);

    if (fileContext.type === "TYPE_1") {
      fetch("http://localhost:8080", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          fileContext.setLogs(res);
          fileContext.setFile(res.filePath);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("http://localhost:8080/type2", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          fileContext.setLogs(res);
          fileContext.setFile(res.filePath);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const numberChangeHandler = (event) => {
    setNumberOfData(event.target.value);
  };

  return (
    <section className="upload__logs">
      <File uploadFileHanlder={uploadFileHanlder} />
      <Filters filterObject={filterObject} setFilterObject={setFilterObject} />

      <div className="upload__results">
        Number Of Results
        <NumberInput min={0} marginTop="1">
          <NumberInputField
            onChange={numberChangeHandler}
            value={numberOfData}
          />
        </NumberInput>
      </div>
    </section>
  );
};

export default UploadLogs;
