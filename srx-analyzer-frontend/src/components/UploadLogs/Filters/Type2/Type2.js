import React, { useState, Fragment, useEffect } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import Filter from "../Filter/Filter";

import "./Type2.css";

const Type2 = (props) => {
  const [souceIpFilterValue, setSouceIpFilterValue] = useState(false);
  const [destinationIpFilterValue, setDestinationIpFilterValue] =
    useState(false);
  const [sourcePortFilterValue, setSourcePortFilterValue] = useState(false);
  const [destinationPortFilterValue, setSestinationPortFilterValue] =
    useState(false);
  const [policyFilterValue, setPolicyFilterValue] = useState(false);
  const [protocolsFilterValue, setProtocolsFilterValue] = useState(false);
  const [sourceZoneFilterValue, setSourceZoneFilterValue] = useState(false);
  const [destinationZoneFilterValue, setDestinationZoneFilterValue] =
    useState(false);
  const [clientBytesFilterValue, setClientBytesFilterValue] = useState(false);
  const [serverBytesFilterValue, setServerBytesFilterValue] = useState(false);

  const [dateInterval, setDateInterval] = useState({ start: "", end: "" });
  const [sessionChange, setSessionChange] = useState("");

  useEffect(() => {
    console.log(dateInterval, sessionChange);
    props.setFilterObject({
      sourceIp: souceIpFilterValue,
      destinationIp: destinationIpFilterValue,
      sourcePort: sourcePortFilterValue,
      destinationPort: destinationPortFilterValue,
      policy: policyFilterValue,
      protocol: protocolsFilterValue,
      sourceZone: sourceZoneFilterValue,
      destinationZone: destinationZoneFilterValue,
      clientBytes: clientBytesFilterValue,
      serverBytes: serverBytesFilterValue,
      dateInterval,
      sessionChange,
    });
  }, [
    dateInterval,
    sessionChange,
    souceIpFilterValue,
    destinationIpFilterValue,
    sourcePortFilterValue,
    destinationPortFilterValue,
    policyFilterValue,
    protocolsFilterValue,
    sourceZoneFilterValue,
    destinationZoneFilterValue,
    clientBytesFilterValue,
    serverBytesFilterValue,
  ]);

  const startDateHandler = (event) => {
    setDateInterval((state) => {
      return { ...state, start: event.target.value };
    });
  };

  const endDateHandler = (event) => {
    setDateInterval((state) => {
      return { ...state, end: event.target.value };
    });
  };

  const sessionChangeHandler = (event) => {
    setSessionChange(event.target.value);
    setSouceIpFilterValue(false);
    setDestinationIpFilterValue(false);
    setSourcePortFilterValue(false);
    setSestinationPortFilterValue(false);
    setPolicyFilterValue(false);
    setProtocolsFilterValue(false);
    setSourceZoneFilterValue(false);
    setDestinationZoneFilterValue(false);
    setClientBytesFilterValue(false);
    setServerBytesFilterValue(false);
  };

  const filtersJSX = (
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
      <Filter
        id={"protocol"}
        caption={"Protocols"}
        value={protocolsFilterValue}
        changeHandler={setProtocolsFilterValue}
      />
    </div>
  );

  const CreateAndDenyFiltersJSX = (
    <Fragment>
      {filtersJSX}
      <div className="filters__cont-2">
        <Filter
          id={"policy"}
          caption={"Policy"}
          value={policyFilterValue}
          changeHandler={setPolicyFilterValue}
        />
        <Filter
          id={"srcZone"}
          caption={"Source Zone"}
          value={sourceZoneFilterValue}
          changeHandler={setSourceZoneFilterValue}
        />
        <Filter
          id={"destZone"}
          caption={"Destination Zone"}
          value={destinationZoneFilterValue}
          changeHandler={setDestinationZoneFilterValue}
        />
      </div>
    </Fragment>
  );

  const CloseFiltersJSX = (
    <Fragment>
      {filtersJSX}
      <div className="filters__cont-2">
        <Filter
          id={"policy"}
          caption={"Policy"}
          value={policyFilterValue}
          changeHandler={setPolicyFilterValue}
        />
        <Filter
          id={"srcZone"}
          caption={"Source Zone"}
          value={sourceZoneFilterValue}
          changeHandler={setSourceZoneFilterValue}
        />
        <Filter
          id={"destZone"}
          caption={"Destination Zone"}
          value={destinationZoneFilterValue}
          changeHandler={setDestinationZoneFilterValue}
        />
        <Filter
          id={"clientByte"}
          caption={"Client Bytes"}
          value={clientBytesFilterValue}
          changeHandler={setClientBytesFilterValue}
        />
        <Filter
          id={"serverByte"}
          caption={"Server Bytes"}
          value={serverBytesFilterValue}
          changeHandler={setServerBytesFilterValue}
        />
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <h3>Filters</h3>
      <FormControl alignItems="center" className="filters__cont">
        <Select
          variant="filled"
          placeholder="Select Session Flow"
          className="filters__select"
          onChange={sessionChangeHandler}
        >
          <option value="create">Session Create</option>
          <option value="close">Session Close</option>
          <option value="deny">Session Deny</option>
        </Select>
        {(sessionChange === "create" || sessionChange === "deny") && [
          CreateAndDenyFiltersJSX,
        ]}
        {sessionChange === "close" && [CloseFiltersJSX]}
      </FormControl>
      <div className="filters__date">
        <div className="filters__date_cont">
          <FormLabel htmlFor="startdate">Start Date</FormLabel>
          <input type="date" id="startdate" onChange={startDateHandler} />
        </div>
        <div className="filters__date_cont">
          <FormLabel htmlFor="enddate">End Date</FormLabel>
          <input type="date" id="enddate" onChange={endDateHandler} />
        </div>
      </div>
    </Fragment>
  );
};

export default Type2;
