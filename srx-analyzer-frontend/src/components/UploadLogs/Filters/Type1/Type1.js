import React, { Fragment, useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/react";

import Filter from "../Filter/Filter";

import "./Type1.css";

const Type1 = (props) => {
  const [souceIpFilterValue, setSouceIpFilterValue] = useState(false);
  const [destinationIpFilterValue, setDestinationIpFilterValue] =
    useState(false);
  const [sourcePortFilterValue, setSourcePortFilterValue] = useState(false);
  const [destinationPortFilterValue, setSestinationPortFilterValue] =
    useState(false);
  const [policyFilterValue, setPolicyFilterValue] = useState(false);
  const [protocolsFilterValue, setProtocolsFilterValue] = useState(false);
  const [interfaceFilterValue, setInterfaceFilterValue] = useState(false);
  const [packetFilterValue, setPacketFilterValue] = useState(false);
  const [bytesFilterValue, setBytesFilterValue] = useState(false);

  useEffect(() => {
    props.setFilterObject({
      sourceIp: souceIpFilterValue,
      destinationIp: destinationIpFilterValue,
      sourcePort: sourcePortFilterValue,
      destinationPort: destinationPortFilterValue,
      policy: policyFilterValue,
      protocol: protocolsFilterValue,
      interface: interfaceFilterValue,
      packet: packetFilterValue,
      bytes: bytesFilterValue,
    });

    console.log({
      sourceIp: souceIpFilterValue,
      destinationIp: destinationIpFilterValue,
      sourcePort: sourcePortFilterValue,
      destinationPort: destinationPortFilterValue,
      policy: policyFilterValue,
      protocol: protocolsFilterValue,
      interface: interfaceFilterValue,
      packet: packetFilterValue,
      bytes: bytesFilterValue,
    });
  }, [
    souceIpFilterValue,
    destinationIpFilterValue,
    sourcePortFilterValue,
    destinationPortFilterValue,
    policyFilterValue,
    protocolsFilterValue,
    interfaceFilterValue,
    packetFilterValue,
    bytesFilterValue,
  ]);

  return (
    <Fragment>
      <h3>Filters</h3>
      <FormControl alignItems="center" className="filters__cont">
        <div className="filters__cont-1">
          <Filter
            id={"srcip"}
            caption={"Source IPs"}
            value={souceIpFilterValue}
            changeHandler={setSouceIpFilterValue}
          />
          <Filter
            id={"destip"}
            caption={"Destination IPs"}
            value={destinationIpFilterValue}
            changeHandler={setDestinationIpFilterValue}
          />
          <Filter
            id={"scrport"}
            caption={"Source Ports"}
            value={sourcePortFilterValue}
            changeHandler={setSourcePortFilterValue}
          />
          <Filter
            id={"destport"}
            caption={"Destination Ports"}
            value={destinationPortFilterValue}
            changeHandler={setSestinationPortFilterValue}
          />
        </div>
        <div className="filters__cont-2">
          <Filter
            id={"protocol"}
            caption={"Protocols"}
            value={protocolsFilterValue}
            changeHandler={setProtocolsFilterValue}
          />
          <Filter
            id={"policy"}
            caption={"Policy"}
            value={policyFilterValue}
            changeHandler={setPolicyFilterValue}
          />
          <Filter
            id={"interface"}
            caption={"Interface"}
            value={interfaceFilterValue}
            changeHandler={setInterfaceFilterValue}
          />
          <Filter
            id={"packet"}
            caption={"Packets"}
            value={packetFilterValue}
            changeHandler={setPacketFilterValue}
          />
          <Filter
            id={"byte"}
            caption={"Bytes"}
            value={bytesFilterValue}
            changeHandler={setBytesFilterValue}
          />
        </div>
      </FormControl>
    </Fragment>
  );
};

export default Type1;
