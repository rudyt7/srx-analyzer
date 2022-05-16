import React, { Fragment, useContext } from "react";
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
import "./Type1.css";

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

const Type1 = () => {
  const file = useContext(FileContext);

  let sourceIPJSX;
  let destinationIPJSX;
  let sourcePortJSX;
  let destinationPortJSX;
  let protocolJSX;
  let policyJSX;
  let interfaceJSX;
  let packetJSX;
  let byteJSX;

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

  interfaceJSX = getTableData(
    file.logs.interfaceSorted,
    "Interfaces",
    "Interface",
    "Frequency"
  );

  tableDataJSX.push(interfaceJSX);

  if (file.logs.packetsSorted.length > 0) {
    packetJSX = (
      <TableContainer className="table__cont">
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Client Bytes</TableCaption>
          <Thead>
            <Tr>
              <Th>Packets</Th>
              <Th>Source IP</Th>
              <Th>Source Port</Th>
              <Th>Destination IP</Th>
              <Th>Destination Port</Th>
            </Tr>
          </Thead>
          <Tbody>
            {file.logs.packetsSorted.map((element, i) => {
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

  if (file.logs.bytesSorted.length > 0) {
    byteJSX = (
      <TableContainer className="table__cont">
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Server Bytes</TableCaption>
          <Thead>
            <Tr>
              <Th>Bytes</Th>
              <Th>Source IP</Th>
              <Th>Source Port</Th>
              <Th>Destination IP</Th>
              <Th>Destination Port</Th>
            </Tr>
          </Thead>
          <Tbody>
            {file.logs.bytesSorted.map((element, i) => {
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
    <div>
      <div className="table__logs-1">{tableDataArrayJSX}</div>
      <div className="table__logs-2">
        {packetJSX}
        {byteJSX}
      </div>
    </div>
  );
};

export default Type1;
