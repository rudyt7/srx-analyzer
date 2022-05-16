exports.givePopulatedObject = (arr) => {
  let count = {};
  let i;

  for (i of arr) {
    if (!count[i]) {
      count[i] = 0;
    }
    count[i]++;
  }

  return count;
};

exports.giveSlicedData = (arr, number, filter) => {
  if (filter) {
    return arr.slice(0, +number);
  }
  return [];
};

exports.mergeObject = (arr) => {
  const mergedObject = {};
  const countObj = {};

  arr.forEach((element, i) => {
    if (i !== 0) {
      if (!countObj[element.session]) {
        countObj[element.session] = {
          totalPackets: element.totalPackets,
          totalBytes: element.totalBytes,
        };

        mergedObject[element.session] = {
          ip: element.ip,
          destIp: element.destIp,
          totalPackets: element.totalPackets,
          totalBytes: element.totalBytes,
        };
      }

      if (
        countObj[element.session].totalPackets === 0 &&
        element.totalPackets !== 0
      ) {
        countObj[element.session].totalPacket = element.totalPackets;
      }

      if (
        countObj[element.session].totalBytes === 0 &&
        element.totalBytes !== 0
      ) {
        countObj[element.session].totalBytes = element.totalBytes;
      }

      mergedObject[element.session] = {
        ...mergedObject[element.session],
        totalPackets:
          countObj[element.session].totalPackets + element.totalPackets,
        totalBytes: countObj[element.session].totalBytes + element.totalBytes,
      };
    }
  });

  return mergedObject;
};
