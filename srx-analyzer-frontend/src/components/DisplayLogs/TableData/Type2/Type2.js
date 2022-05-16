import React, { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { FileContext } from "../../../../context/FileContext";

import "./Type2.css";

const getTableData = (array, caption, header1, header2) => {
  let JSX = null;
  if (array.length > 0) {
    JSX = (
      <TableContainer className="table__cont">
        <Table variant="striped" colorScheme="purple">
          <TableCaption>{caption}</TableCaption>
          <Thead>
            <Tr>
              <Th>{header1}</Th>
              <Th>{header2}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {array.map((element) => {
              return (
                <Tr key={element[0]}>
                  <Td>{element[0]}</Td>
                  <Td>{element[1]}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return JSX;
};

const Type2 = () => {
  const file = useContext(FileContext);

  console.log(file.logs);

  let sourceIPJSX;
  let destinationIPJSX;
  let sourcePortJSX;
  let destinationPortJSX;
  let protocolJSX;
  let policyJSX;
  let sourceZoneJSX;
  let destinationZoneJSX;
  let clientByteJSX;
  let serverByteJSX;

  const tableDataJSX = [];

  sourceIPJSX = getTableData(
    file.logs.sourceIpSorted,
    "Source Ips",
    "IPs",
    "Frequency"
  );

  tableDataJSX.push(sourceIPJSX);

  destinationIPJSX = getTableData(
    file.logs.destinationIpSorted,
    "Destination Ips",
    "IPs",
    "Frequency"
  );

  tableDataJSX.push(destinationIPJSX);

  sourcePortJSX = getTableData(
    file.logs.sourcePortSorted,
    "Source Ports",
    "Ports",
    "Frequency"
  );

  tableDataJSX.push(sourcePortJSX);

  destinationPortJSX = getTableData(
    file.logs.destinationPortSorted,
    "Destination Ports",
    "Ports",
    "Frequency"
  );

  tableDataJSX.push(destinationPortJSX);

  protocolJSX = getTableData(
    file.logs.protocolSorted,
    "Protocols",
    "Protocol",
    "Frequency"
  );

  tableDataJSX.push(protocolJSX);

  policyJSX = getTableData(
    file.logs.policySorted,
    "Policies",
    "Policy",
    "Frequency"
  );

  tableDataJSX.push(policyJSX);

  sourceZoneJSX = getTableData(
    file.logs.sourceZoneSorted,
    "Source Zones",
    "Source Zone",
    "Frequency"
  );

  tableDataJSX.push(sourceZoneJSX);

  destinationZoneJSX = getTableData(
    file.logs.destinationZoneSorted,
    "Destination Zones",
    "Destination Zone",
    "Frequency"
  );

  tableDataJSX.push(destinationZoneJSX);

  if (file.logs.clientBytesSorted.length > 0) {
    clientByteJSX = (
      <TableContainer className="table__cont">
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Client Bytes</TableCaption>
          <Thead>
            <Tr>
              <Th>Client Bytes</Th>
              <Th>Source IP</Th>
              <Th>Source Port</Th>
              <Th>Destination IP</Th>
              <Th>Destination Port</Th>
            </Tr>
          </Thead>
          <Tbody>
            {file.logs.clientBytesSorted.map((element, i) => {
              return (
                <Tr key={element[0]}>
                  <Td>{element[0]}</Td>
                  <Td>{element[1]}</Td>
                  <Td>{element[2]}</Td>
                  <Td>{element[3]}</Td>
                  <Td>{element[4]}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  if (file.logs.serverBytesSorted.length > 0) {
    serverByteJSX = (
      <TableContainer className="table__cont">
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Server Bytes</TableCaption>
          <Thead>
            <Tr>
              <Th>Server Bytes</Th>
              <Th>Source IP</Th>
              <Th>Source Port</Th>
              <Th>Destination IP</Th>
              <Th>Destination Port</Th>
            </Tr>
          </Thead>
          <Tbody>
            {file.logs.serverBytesSorted.map((element, i) => {
              return (
                <Tr key={element[0]}>
                  <Td>{element[0]}</Td>
                  <Td>{element[1]}</Td>
                  <Td>{element[2]}</Td>
                  <Td>{element[3]}</Td>
                  <Td>{element[4]}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  const tableDataArrayJSX = tableDataJSX.map((table) => {
    return table;
  });

  return (
    <div className="type2__tables">
      <div className="table__logs-1">{tableDataArrayJSX}</div>
      <div className="table__logs-2">
        {clientByteJSX}
        {serverByteJSX}
      </div>
    </div>
  );
};

export default Type2;
