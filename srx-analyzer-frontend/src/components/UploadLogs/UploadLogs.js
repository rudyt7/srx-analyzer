import React, { useState, useEffect, useContext } from "react";
import { NumberInput, NumberInputField, useToast } from "@chakra-ui/react";

import { FileContext } from "../../context/FileContext";
import File from "./File/File";
import Filters from "./Filters/Filters";

import "./UploadLogs.css";

const UploadLogs = () => {
  const fileContext = useContext(FileContext);
  const toast = useToast();
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
    if (file === null) {
      toast({
        title: "No File",
        description: "Please Select a File.",
        position: "top",
        status: "warning",
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
      });
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

    console.log(numberOfData);

    if (fileContext.type === "TYPE_1") {
      if (numberOfData === "" || numberOfData === null || numberOfData <= 0) {
        toast({
          title: "Number of Results",
          description: "Please give a number.",
          position: "top",
          status: "warning",
          variant: "left-accent",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

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
      if (
        !filterObject.dateInterval.start &&
        !filterObject.dateInterval.end &&
        (numberOfData === "" || numberOfData === null || numberOfData <= 0)
      ) {
        toast({
          title: "Number of Results",
          description: "Please give a number.",
          position: "top",
          status: "warning",
          variant: "left-accent",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      if (
        filterObject.sessionChange === "" ||
        filterObject.sessionChange === null
      ) {
        toast({
          title: "Session",
          description: "No session type selected",
          position: "top",
          status: "warning",
          variant: "left-accent",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      if (
        (filterObject.dateInterval.start &&
          filterObject.dateInterval.end === "") ||
        (filterObject.dateInterval.end &&
          filterObject.dateInterval.start === "")
      ) {
        toast({
          title: "Dates",
          description: "Both Dates Not Entered",
          position: "top",
          status: "warning",
          variant: "left-accent",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

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
          fileContext.setSessionLoaded(true);
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
