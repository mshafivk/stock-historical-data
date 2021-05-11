import React, { FunctionComponent, useReducer, useState } from "react";
import Header from "./components/Header/Header";
import "./App.scss";

import gridIcon from "./images/grid-icon.svg";
import cardIcon from "./images/card-icon.svg";
import chartIcon from "./images/bar-chart.svg";

import { initialState, stockReducer } from "./reducers/stockReducer";
import AppContext from "./AppContext";
import CardView from "./components/CardView/CardView";
import GridView from "./components/GridView/GridView";
import ChartView from "./components/ChartView/ChartView";

const App: FunctionComponent<{}> = () => {
  const [state, dispatch] = useReducer(stockReducer, initialState);
  const [activeTab, setActiveTab] = useState(0);

  const providerState = {
    state,
    dispatch,
  };

  const switchTab = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <AppContext.Provider value={providerState}>
      <div className="app-container">
        <Header></Header>
        <div className="main">
          <div className="container">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${activeTab === 0 && "active"}`}
                  onClick={() => {
                    switchTab(0);
                  }}
                >
                  <img src={cardIcon} alt="card view" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${activeTab === 1 && "active"}`}
                  onClick={() => {
                    switchTab(1);
                  }}
                >
                  <img src={gridIcon} alt="grid view" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${activeTab === 2 && "active"}`}
                  onClick={() => {
                    switchTab(2);
                  }}
                >
                  <img src={chartIcon} alt="chart view" />
                </a>
              </li>
            </ul>
            <div className="container row">
              {activeTab === 0 && <CardView />}
              {activeTab === 1 && <GridView />}
              {activeTab === 2 && <ChartView />}
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
