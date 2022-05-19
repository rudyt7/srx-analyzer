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
  const packetsList = [];
  const byteList = [];

  const graphData = [];

  let source_ips = 0;
  let dest_ips = 0;
  let dest_ports = 0;
  let source_ports = 0;
  let policies = 0;
  let protocols = 0;
  let interfaces = 0;

  let session, ip, destIp, totalBytes, totalPackets;

  const filters = JSON.parse(req.body.filters);
  const numberOfData = JSON.parse(req.body.numberOfData);
  const filePath = JSON.parse(req.body.fullPath);

  logger.info(filters);

  fs.readFile(filePath.path, function (err, data) {
    if (err) {
      logger.error(err);
    }
    dataLines = data.toString().replace(/\r\n/g, "\n").split("\n");
    dataLines = dataLines.filter((line) => {
      return line !== "";
    });
    dataLines.forEach((line) => {
      if (line.includes("Session ID:")) {
        session = line.split("Session ID:")[1].split(",")[0];
        const policyName = line.split("Policy name:")[1].split(",")[0];
        policyList.push(policyName);
        policies++;
      }

      if (line.includes("In:")) {
        const sourceIp = line.split(":")[1].split("/")[0];
        ip = sourceIp;
        sourceIpList.push(sourceIp);
        source_ips++;

        const destinationIp = line.split("-->")[1].split("/")[0];
        destIp = destinationIp;
        destinationIpList.push(destinationIp);
        dest_ips++;

        const sourcePort = line.split("/")[1].split("-->")[0];
        srcPortList.push(sourcePort);
        source_ports++;

        const destinationPort = line.split("/")[2].split(";")[0];
        destPortList.push(destinationPort);
        dest_ports++;

        const protocol = line.split(";")[1].split(",")[0];
        protocolList.push(protocol);
        protocols++;

        const interface = line.split("If:")[1].split(",")[0];
        interfaceList.push(interface);
        interfaces++;

        const packets = line.split("Pkts:")[1].split(",")[0];
        totalPackets += +packets;
        packetsList.push([
          +packets,
          sourceIpList.at(-1),
          srcPortList.at(-1),
          destinationIpList.at(-1),
          destPortList.at(-1),
        ]);

        const bytes = line.split("Bytes:")[1].split(",")[0];
        totalBytes += +bytes;
        byteList.push([
          +bytes,
          sourceIpList.at(-1),
          srcPortList.at(-1),
          destinationIpList.at(-1),
          destPortList.at(-1),
        ]);
      }

      if (line.includes("Out:")) {
        const interface = line.split("If:")[1].split(",")[0];
        interfaceList.push(interface);
        interfaces++;

        const packets = line.split("Pkts:")[1].split(",")[0];
        totalPackets += +packets;

        packetsList.push([
          +packets,
          destinationIpList.at(-1),
          destPortList.at(-1),
          sourceIpList.at(-1),
          srcPortList.at(-1),
        ]);

        const bytes = line.split("Bytes:")[1].split(",")[0];
        totalBytes += +bytes;

        byteList.push([
          +bytes,
          destinationIpList.at(-1),
          destPortList.at(-1),
          sourceIpList.at(-1),
          srcPortList.at(-1),
        ]);
      }

      graphData.push({ session, ip, destIp, totalPackets, totalBytes });
      totalBytes = 0;
      totalPackets = 0;
    });

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

    const interfaceSorted = Object.entries(
      utilFunctions.givePopulatedObject(interfaceList)
    ).sort(([, a], [, b]) => b - a);

    const packetsSorted = packetsList.sort(([a], [b]) => b - a);

    const bytesSorted = byteList.sort(([a], [b]) => b - a);

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

    responseObject.interfaceSorted = utilFunctions.giveSlicedData(
      interfaceSorted,
      numberOfData,
      filters.interface
    );

    responseObject.packetsSorted = utilFunctions.giveSlicedData(
      packetsSorted,
      numberOfData,
      filters.packet
    );

    responseObject.bytesSorted = utilFunctions.giveSlicedData(
      bytesSorted,
      numberOfData,
      filters.bytes
    );

    const mergedGraphObj = utilFunctions.mergeObject(graphData);

    res.json({ ...responseObject, filePath, mergedGraphObj });
    logger.info("data returned");
  });
};

exports.deleteFile = (req, res, next) => {
  const filePath = JSON.parse(req.body.fullPath);

  fs.unlink(filePath.path, (error) => {
    if (error) {
      logger.error(error);
    }
    logger.info("file deleted");
    res.json({ message: "file deleted" });
  });
};
