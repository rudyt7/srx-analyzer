import React, { Fragment, useContext } from "react";
import {
  BarChart,
  Bar,
  Cell,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

import { FileContext } from "../../../../context/FileContext";
import "./Type1.css";

const Type1 = () => {
  const fileContext = useContext(FileContext);

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

  return (
    <div className="graph__container">
      <div className="graph__container-sub">
        <ComposedChart
          width={900}
          height={450}
          data={trafficData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalBytes" fill="#ffc658" />
          <Line type="monotone" dataKey="totalBytes" stroke="#8884d8" />
          <Brush dataKey="name" height={30} stroke="#ffc658" />
        </ComposedChart>
        <h3>Total traffic in Packets</h3>
      </div>
      <div className="graph__container-2">
        <div className="graph__container-sub">
          <ComposedChart
            width={900}
            height={450}
            data={trafficData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalPackets" fill="#82ca9d" />
            <Line type="monotone" dataKey="totalPackets" stroke="#8884d8" />
            <Brush dataKey="name" height={30} stroke="#82ca9d" />
          </ComposedChart>
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
                innerRadius={40}
                outerRadius={80}
                fill="#007FFF"
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
