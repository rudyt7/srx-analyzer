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

exports.giveSumObject = (arr) => {
  let count = {};
  let sumObject = {};

  arr.forEach((element) => {
    if (!count[element[0]]) {
      count[element[0]] = {
        bytes: [],
        packets: [],
      };
    }

    count[element[0]].bytes.push(+element[1]);
    count[element[0]].bytes.push(+element[2]);
    count[element[0]].packets.push(+element[3]);
    count[element[0]].packets.push(+element[4]);
  });

  for (const [key, value] of Object.entries(count)) {
    let packetsSum = 0,
      bytesSum = 0;
    for (const i of value.bytes) {
      bytesSum += i;
    }

    for (const j of value.packets) {
      packetsSum += j;
    }

    sumObject[key] = {
      bytes: bytesSum,
      packets: packetsSum,
    };
  }

  return sumObject;
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
