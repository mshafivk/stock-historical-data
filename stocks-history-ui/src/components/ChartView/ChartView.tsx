import React, { FunctionComponent, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import "./chartView.scss";
import { useAppContext } from "../../AppContext";

const ChartView: FunctionComponent<{}> = () => {
  const { state } = useAppContext();
  const historicalData = state.selectedStock?.historicalData;
  const name = state.selectedStock?.name;

  const chartData = useMemo(
    () =>
      historicalData?.reduce((allData, current) => {
        allData.push({
          date: current.date,
          adj_close: current.adj_close,
          volume: current.volume,
        });
        console.log(allData);
        return allData;
      }, []),
    [name, historicalData]
  );

  console.log(chartData);
  return (
    <React.Fragment>
      <div className="row">
        <h2>{name}</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffb0b0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="volume"
              fill="#8884d8"
              stroke="#8884d8"
            />

            <Line type="monotone" dataKey="adj_close" stroke="#82ca9d" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default ChartView;
