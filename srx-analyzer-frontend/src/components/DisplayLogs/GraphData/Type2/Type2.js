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
  ResponsiveContainer,
} from "recharts";

import { FileContext } from "../../../../context/FileContext";

import "./Type2.css";

const Type2 = () => {
  const fileContext = useContext(FileContext);

  const trafficData = [];

  for (const [key, value] of Object.entries(fileContext.logs.mergedGraphObj)) {
    const date = new Date(key);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const dataObj = {
      name: `${day} ${month}`,
      packets: value.packets,
      bytes: value.bytes,
    };

    trafficData.push(dataObj);
  }

  return (
    <div>
      <div className="graph__container">
        <div className="graph__container-sub">
          <BarChart
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
            <Bar dataKey="packets" fill="#ffc658" />
            <Brush dataKey="name" height={30} stroke="#ffc658" />
          </BarChart>
          <h3>Total Packets</h3>
        </div>
        <div className="graph__container-sub">
          <BarChart
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
            <Bar dataKey="bytes" fill="#82ca9d" />
            <Brush dataKey="name" height={30} stroke="#82ca9d" />
          </BarChart>
          <h3>Total Bytes</h3>
        </div>
      </div>
    </div>
  );
};

export default Type2;
