import React, { FunctionComponent } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "./GridView.scss";
import { useAppContext } from "../../AppContext";
import moment from "moment";

const dateValueFormatter = (params) => moment(params.newValue).format("LL");
const numberFormatter = (params) => Number(params.value).toFixed(2);

const GridView: FunctionComponent<{}> = () => {
  const { state } = useAppContext();
  const historicalData = state.selectedStock?.historicalData;
  const name = state.selectedStock?.name;
  return (
    <React.Fragment>
      <div className="row">
        <h2>{name}</h2>
      </div>
      <div className="ag-theme-alpine grid-container">
        <AgGridReact rowData={historicalData} pagination={true}>
          <AgGridColumn
            field="date"
            valueFormatter={dateValueFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="open"
            valueFormatter={numberFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="low"
            valueFormatter={numberFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="high"
            valueFormatter={numberFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="close"
            valueFormatter={numberFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="adj_close"
            valueFormatter={numberFormatter}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </React.Fragment>
  );
};

export default GridView;
