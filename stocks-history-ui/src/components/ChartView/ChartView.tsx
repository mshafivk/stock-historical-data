import React, { FunctionComponent, useMemo, useEffect } from "react";
import Highcharts, { chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./chartView.scss";
import { useAppContext } from "../../AppContext";
import { numFormatter } from "../../utils/utils";
import moment from "moment";
Highcharts.setOptions({
  time: {
    useUTC: false,
  },
});
window.Highcharts = Highcharts;

const ChartView: FunctionComponent<{}> = () => {
  const { state } = useAppContext();
  const historicalData = state.selectedStock?.historicalData;
  const name = state.selectedStock?.name;
  const chartRef: React.Ref<{
    chart: Highcharts.Chart;
    container: React.RefObject<HTMLDivElement>;
  }> = React.createRef();

  const chartData = useMemo(
    () =>
      historicalData?.reduce(
        (allData, current) => {
          const dateValue = new Date(current["date"]);
          allData = {
            adj_close: [
              [dateValue.getTime(), current["adj_close"]],
              ...allData["adj_close"],
            ],
            volume: [
              [dateValue.getTime(), current["volume"]],
              ...allData["volume"],
            ],
          };
          return allData;
        },
        { adj_close: [], volume: [] }
      ),
    [name, historicalData]
  );

  const options: Highcharts.Options = {
    title: {
      text: name,
    },
    chart: {
      zoomType: "x",
    },
    tooltip: {
      shared: true,
      formatter: function () {
        const dateVal = moment(this.points[0].x).format("LL");
        return `${dateVal}<br/><span><strong>Volume: </strong></volume>${
          this.points.length > 0 && this.points[0].y
        } </span><br/>
        <span><strong>Adj. Close: </strong></volume>${
          this.points.length > 1 && this.points[1].y.toFixed(2)
        } </span><br/>
        `;
      },
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    xAxis: {
      crosshair: true,
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%d %b %Y",
      },
    },
    yAxis: [
      {
        title: {
          text: "Volume",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        id: "volume",
        opposite: false,
      },
      {
        title: {
          text: "Adj. Close",
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        id: "adj_close",
        opposite: true,
        max: 1000,
      },
    ],
    series: [
      {
        id: "volume",
        type: "line",
        data: (chartData && chartData["volume"]) || [],
        name: "Volume",
        color: Highcharts.getOptions().colors[0],
      },
      {
        id: "adj_close",
        type: "column",
        data: (chartData && chartData["adj_close"]) || [],
        name: "Adj. Close",
        color: Highcharts.getOptions().colors[2],
        yAxis: 1,
      },
    ],
    rangeSelector: {
      buttons: [
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 4,
    },
  };

  return (
    <React.Fragment>
      {chartData && (
        <div className="chart-container">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType="stockChart"
            immutable={true}
            ref={chartRef}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ChartView;
