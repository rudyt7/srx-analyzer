import React, { Fragment, useState, useContext, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { FileContext } from "../../../context/FileContext";
import "./File.css";

const File = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const toast = useToast();

  const fileContext = useContext(FileContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = (event) => {
        setFileContent(event.target.result);

        if (event.target.result.toString().includes("RT_FLOW")) {
          fileContext.setType("TYPE_2");
        } else if (event.target.result.toString().includes("Session ID:")) {
          fileContext.setType("TYPE_1");
        } else {
          toast({
            title: "Wrong File",
            description: "Please Select a Correct File.",
            position: "top",
            status: "warning",
            variant: "left-accent",
            duration: 2000,
            isClosable: true,
          });
          onFileChangedHandler(null);
          setFileContent(null);
          fileContext.setType(null);
          return;
        }
      };
    }
  }, [selectedFile]);

  const onFileChangedHandler = (file) => {
    if (file === null) {
      setSelectedFile(file);
      return;
    }

    if (
      selectedFile &&
      selectedFile.name === file.name &&
      selectedFile.size === file.size
    ) {
      return;
    }

    setSelectedFile(file);
  };

  const uploadFileHanlder = () => {
    props.uploadFileHanlder(selectedFile);
  };

  const deleteFileHandler = () => {
    if (fileContext.fileName === "" || fileContext.fileName === null) {
      onFileChangedHandler(null);
      setFileContent(null);
      fileContext.setType(null);
      if (document.querySelector(".file__upload input")) {
        document.querySelector(".file__upload input").value = null;
      }
      return;
    }

    const data = new FormData();
    data.append("fullPath", JSON.stringify(fileContext.fileName));
    fetch("http://127.0.0.1:8080", {
      method: "DELETE",
      body: data,
    })
      .then((res) => {
        fileContext.setFile(null);
        onFileChangedHandler(null);
        setFileContent(null);
        fileContext.setType(null);
        if (document.querySelector(".file__upload input")) {
          document.querySelector(".file__upload input").value = null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!fileContext.fileName && (
        <div className="file__upload">
          <FileUploader
            handleChange={onFileChangedHandler}
            name="file"
            types={["TXT"]}
          >
            <p className="file__upload-uploader">
              Click To Load Files Or Drop Files Here
            </p>
          </FileUploader>
          <p className="file__upload-text">
            {selectedFile
              ? `File name: ${selectedFile.name}`
              : "No files Loaded yet"}
          </p>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {fileContent && (
              <textarea
                className="txt-area"
                value={fileContent}
                readOnly
              ></textarea>
            )}
            {!fileContent && <p>No File To Display</p>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="file__upload--buttons">
        <Button colorScheme="purple" width="130px" onClick={onOpen}>
          Preview File
        </Button>
        <Button colorScheme="purple" width="130px" onClick={uploadFileHanlder}>
          Get Results
        </Button>
        <Button colorScheme="purple" width="130px" onClick={deleteFileHandler}>
          Delete File
        </Button>
      </div>
    </Fragment>
  );
};

export default File;
