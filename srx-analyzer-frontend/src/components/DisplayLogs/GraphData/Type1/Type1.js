import React, { Fragment, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";

import { FileContext } from "../../../../context/FileContext";
import "./Type1.css";

const Type1 = () => {
  const fileContext = useContext(FileContext);

  console.log();

  const trafficData = [];
  const protocolData = [];

  for (const [key, value] of Object.entries(fileContext.logs.mergedGraphObj)) {
    const dataObj = {
      name: `Session ID : ${key}`,
      totalPackets: value.totalPackets,
      totalBytes: value.totalBytes,
      ip: value.ip,
      destIp: value.destIp,
    };
    trafficData.push(dataObj);
  }

  for (const element of fileContext.logs.protocolSorted) {
    const dataObj = {
      name: element[0],
      frequency: element[1],
    };
    protocolData.push(dataObj);
  }

  console.log(protocolData);

  return (
    <div className="graph__container">
      <div className="graph__container-sub">
        <AreaChart
          width={900}
          height={450}
          data={trafficData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalPackets"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
        <h3>Total traffic in Packets</h3>
      </div>
      <div className="graph__container-2">
        <div className="graph__container-sub">
          <AreaChart
            width={900}
            height={450}
            data={trafficData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalBytes"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
          <h3>Total traffic in Bytes</h3>
        </div>
        {fileContext.logs.protocolSorted.length > 0 && (
          <div className="graph__container-sub">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="frequency"
                data={protocolData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
            <h3>Connection Protocols</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Type1;
