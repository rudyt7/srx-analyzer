const utilFunctions = require("../utility/utilFunctions");
const fs = require("fs");
const logger = require("../logger");

exports.getFilteredData = (req, res, next) => {
  let dataLines;
  const sourceIpList = [];
  const destinationIpList = [];
  const srcPortList = [];
  const destPortList = [];
  const policyList = [];
  const protocolList = [];
  const interfaceList = [];
  const sourceZoneList = [];
  const destinationZoneList = [];
  const packetsList = [];
  const byteClientList = [];
  const byteServerList = [];

  let source_ips = 0;
  let dest_ips = 0;
  let dest_ports = 0;
  let source_ports = 0;
  let src_zone = 0;
  let dest_zone = 0;
  let policies = 0;
  let protocols = 0;
  let interfaces = 0;

  const filters = JSON.parse(req.body.filters);
  let numberOfData = JSON.parse(req.body.numberOfData);
  const filePath = JSON.parse(req.body.fullPath);

  logger.info(filters);

  let startDate;
  let endDate;
  if (filters.dateInterval.start && filters.dateInterval.end) {
    startDate = new Date(filters.dateInterval.start);
    endDate = new Date(filters.dateInterval.end);
    numberOfData = 0;
  }

  fs.readFile(filePath.path, (err, data) => {
    if (err) {
      logger.error(err);
    }
    dataLines = data.toString().replace(/\r\n/g, "\n").split("\n");

    dataLines.forEach((line) => {
      if (
        filters.sessionChange === "deny" &&
        line.includes("FLOW_SESSION_DENY")
      ) {
        const denyData = line
          .split("denied")[1]
          .split()[0]
          .replace("->", " ")
          .split(" ");

        const dateArr = line.split(":")[0].split(" ").slice(0, 3);
        const entryDate = new Date(`${dateArr[0]} ${dateArr[2]} 2022`);

        const [sourceIp, sourcePort] = denyData[1].split("/");
        const [destinationIp, destinationPort] = denyData[2].split("/");

        if (startDate && endDate) {
          console.log(startDate < entryDate, entryDate < endDate);
          if (startDate < entryDate && entryDate < endDate) {
            numberOfData++;
            sourceIpList.push(sourceIp);
            source_ips++;
            destinationIpList.push(destinationIp);
            dest_ips++;
            srcPortList.push(sourcePort);
            source_ports++;
            destPortList.push(destinationPort);
            dest_ports++;
            protocolList.push(denyData[4].split("(")[0]);
            protocols++;
            policyList.push(denyData[5]);
            policies++;
            sourceZoneList.push(denyData[6]);
            src_zone++;
            destinationZoneList.push(denyData[7]);
            dest_zone++;
          }
        } else {
          sourceIpList.push(sourceIp);
          source_ips++;
          destinationIpList.push(destinationIp);
          dest_ips++;
          srcPortList.push(sourcePort);
          source_ports++;
          destPortList.push(destinationPort);
          dest_ports++;
          protocolList.push(denyData[4].split("(")[0]);
          protocols++;
          policyList.push(denyData[5]);
          policies++;
          sourceZoneList.push(denyData[6]);
          src_zone++;
          destinationZoneList.push(denyData[7]);
          dest_zone++;
        }
      }

      if (
        filters.sessionChange === "create" &&
        line.includes("FLOW_SESSION_CREATE")
      ) {
        const createData = line
          .split("created")[1]
          .split()[0]
          .replace("->", " ")
          .split(" ");

        const dateArr = line.split(":")[0].split(" ").slice(0, 3);
        const entryDate = new Date(`${dateArr[0]} ${dateArr[2]} 2022`);

        const [sourceIp, sourcePort] = createData[1].split("/");
        const [destinationIp, destinationPort] = createData[2].split("/");

        if (startDate && endDate) {
          if (startDate < entryDate && entryDate < endDate) {
            numberOfData++;
            sourceIpList.push(sourceIp);
            source_ips++;
            destinationIpList.push(destinationIp);
            dest_ips++;
            srcPortList.push(sourcePort);
            source_ports++;
            destPortList.push(destinationPort);
            dest_ports++;
            protocolList.push(createData[7]);
            protocols++;
            policyList.push(createData[8]);
            policies++;
            sourceZoneList.push(createData[9]);
            src_zone++;
            destinationZoneList.push(createData[10]);
            dest_zone++;
          }
        } else {
          sourceIpList.push(sourceIp);
          source_ips++;
          destinationIpList.push(destinationIp);
          dest_ips++;
          srcPortList.push(sourcePort);
          source_ports++;
          destPortList.push(destinationPort);
          dest_ports++;
          protocolList.push(createData[7]);
          protocols++;
          policyList.push(createData[8]);
          policies++;
          sourceZoneList.push(createData[9]);
          src_zone++;
          destinationZoneList.push(createData[10]);
          dest_zone++;
        }
      }

      if (
        filters.sessionChange === "close" &&
        line.includes("FLOW_SESSION_CLOSE")
      ) {
        const closeData = line
          .split(":")[5]
          .split()[0]
          .replace("->", " ")
          .split(" ");

        const dateArr = line.split(":")[0].split(" ").slice(0, 3);
        const entryDate = new Date(`${dateArr[0]} ${dateArr[2]} 2022`);

        const [sourceIp, sourcePort] = closeData[1].split("/");
        const [destinationIp, destinationPort] = closeData[2].split("/");

        if (startDate && endDate) {
          if (startDate < entryDate && entryDate < endDate) {
            numberOfData++;
            sourceIpList.push(sourceIp);
            source_ips++;
            destinationIpList.push(destinationIp);
            dest_ips++;
            srcPortList.push(sourcePort);
            source_ports++;
            destPortList.push(destinationPort);
            dest_ports++;
            protocolList.push(closeData[7].split("(")[0]);
            protocols++;
            policyList.push(closeData[8]);
            policies++;
            sourceZoneList.push(closeData[9]);
            src_zone++;
            destinationZoneList.push(closeData[10]);
            dest_zone++;
            byteClientList.push([
              closeData[12].split("(")[1].split(")")[0],
              sourceIpList.at(-1),
              srcPortList.at(-1),
              destinationIpList.at(-1),
              destPortList.at(-1),
            ]);

            byteServerList.push([
              closeData[13].split("(")[1].split(")")[0],
              destinationIpList.at(-1),
              destPortList.at(-1),
              sourceIpList.at(-1),
              srcPortList.at(-1),
            ]);
          }
        } else {
          sourceIpList.push(sourceIp);
          source_ips++;
          destinationIpList.push(destinationIp);
          dest_ips++;
          srcPortList.push(sourcePort);
          source_ports++;
          destPortList.push(destinationPort);
          dest_ports++;
          protocolList.push(closeData[7].split("(")[0]);
          protocols++;
          policyList.push(closeData[8]);
          policies++;
          sourceZoneList.push(closeData[9]);
          src_zone++;
          destinationZoneList.push(closeData[10]);
          dest_zone++;
          byteClientList.push([
            closeData[12].split("(")[1].split(")")[0],
            sourceIpList.at(-1),
            srcPortList.at(-1),
            destinationIpList.at(-1),
            destPortList.at(-1),
          ]);

          byteServerList.push([
            closeData[13].split("(")[1].split(")")[0],
            destinationIpList.at(-1),
            destPortList.at(-1),
            sourceIpList.at(-1),
            srcPortList.at(-1),
          ]);
        }
      }
    });

    //
    const sourceIpSorted = Object.entries(
      utilFunctions.givePopulatedObject(sourceIpList)
    ).sort(([, a], [, b]) => b - a);

    const destinationIpSorted = Object.entries(
      utilFunctions.givePopulatedObject(destinationIpList)
    ).sort(([, a], [, b]) => b - a);

    const sourcePortSorted = Object.entries(
      utilFunctions.givePopulatedObject(srcPortList)
    ).sort(([, a], [, b]) => b - a);

    const destinationPortSorted = Object.entries(
      utilFunctions.givePopulatedObject(destPortList)
    ).sort(([, a], [, b]) => b - a);

    const protocolSorted = Object.entries(
      utilFunctions.givePopulatedObject(protocolList)
    ).sort(([, a], [, b]) => b - a);

    const policySorted = Object.entries(
      utilFunctions.givePopulatedObject(policyList)
    ).sort(([, a], [, b]) => b - a);

    const sourceZoneSorted = Object.entries(
      utilFunctions.givePopulatedObject(sourceZoneList)
    ).sort(([, a], [, b]) => b - a);

    const destinationZoneSorted = Object.entries(
      utilFunctions.givePopulatedObject(destinationZoneList)
    ).sort(([, a], [, b]) => b - a);

    const clientBytesSorted = byteClientList.sort(([a], [b]) => b - a);

    const serverBytesSorted = byteServerList.sort(([a], [b]) => b - a);

    console.log(sourceIpSorted, destinationIpSorted);

    const responseObject = {};

    responseObject.sourceIpSorted = utilFunctions.giveSlicedData(
      sourceIpSorted,
      numberOfData,
      filters.sourceIp
    );

    responseObject.destinationIpSorted = utilFunctions.giveSlicedData(
      destinationIpSorted,
      numberOfData,
      filters.destinationIp
    );

    responseObject.sourcePortSorted = utilFunctions.giveSlicedData(
      sourcePortSorted,
      numberOfData,
      filters.sourcePort
    );

    responseObject.destinationPortSorted = utilFunctions.giveSlicedData(
      destinationPortSorted,
      numberOfData,
      filters.destinationPort
    );

    responseObject.protocolSorted = utilFunctions.giveSlicedData(
      protocolSorted,
      numberOfData,
      filters.protocol
    );

    responseObject.policySorted = utilFunctions.giveSlicedData(
      policySorted,
      numberOfData,
      filters.policy
    );

    responseObject.sourceZoneSorted = utilFunctions.giveSlicedData(
      sourceZoneSorted,
      numberOfData,
      filters.sourceZone
    );

    responseObject.destinationZoneSorted = utilFunctions.giveSlicedData(
      destinationZoneSorted,
      numberOfData,
      filters.destinationZone
    );

    responseObject.clientBytesSorted = utilFunctions.giveSlicedData(
      clientBytesSorted,
      numberOfData,
      filters.clientBytes
    );

    responseObject.serverBytesSorted = utilFunctions.giveSlicedData(
      serverBytesSorted,
      numberOfData,
      filters.serverBytes
    );

    res.json({ ...responseObject, filePath });
    logger.info("response sent");
  });
};
