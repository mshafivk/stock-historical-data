import moment from "moment";
import React, { FunctionComponent } from "react";
import { useAppContext } from "../../AppContext";
import { DP_VALUE } from "../../constants";
import "./cardview.scss";

const CardView: FunctionComponent<{}> = () => {
  const { state } = useAppContext();
  const historicalData = state.selectedStock?.historicalData;
  const name = state.selectedStock?.name;
  return (
    <React.Fragment>
      <div className="row">
        <h2>{name}</h2>
      </div>
      <div className="row">
        {historicalData &&
          historicalData.map(({ date, open, low, high, close, adj_close }) => (
            <div className="card-container" key={date}>
              <fieldset className="card">
                <div className="card-body">
                  <h3 className="card-title">{moment(date).format("LL")}</h3>
                  <div>
                    <span>Open:</span>
                    <span>{open.toFixed(DP_VALUE)}</span>
                  </div>
                  <div>
                    <span>High:</span>
                    <span>{high.toFixed(DP_VALUE)}</span>
                  </div>
                  <div>
                    <span>Low:</span>
                    <span>{low.toFixed(DP_VALUE)}</span>
                  </div>
                  <div>
                    <span>Close:</span>
                    <span>{close.toFixed(DP_VALUE)}</span>
                  </div>
                  <div>
                    <span>Adj. Close:</span>
                    <span>{adj_close.toFixed(DP_VALUE)}</span>
                  </div>
                </div>
              </fieldset>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default CardView;
