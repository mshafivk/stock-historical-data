import { _searchItem, stock } from "../models/models";
import {
  CLEAR_SEARCH_LIST,
  SEARCH_RESPONSE,
  SET_SELECTED_STOCK,
} from "./actions";

export interface IState {
  selectedStock: stock | null;
  isLoading: boolean;
  searchedList: _searchItem[];
}

export type IAction = {
  type: string;
  payload?: IState | stock | _searchItem[];
};

export const initialState: IState = {
  selectedStock: null,
  isLoading: false,
  searchedList: [],
};

export const stockReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case SEARCH_RESPONSE:
      return Object.assign({}, state, {
        searchedList: action.payload,
      });
    case SET_SELECTED_STOCK:
      return {
        ...state,
        ...{
          selectedStock: action.payload && serializeData(action.payload[0]),
        },
      };
    case CLEAR_SEARCH_LIST:
      return { ...state, ...{ searchedList: [] } };
    default:
      return state;
  }
};

const serializeData = (stock) => {
  const historicalData = stock["historicalData"];
  if (historicalData) {
    const updatedData = historicalData
      .map((_data) => {
        const newObj = Object.assign(
          {},
          {
            date: _data["Date"],
            open: Number(_data["Open"]),
            high: Number(_data["High"]),
            low: Number(_data["Low"]),
            close: Number(_data["Close"]),
            volume: Number(_data["Volume"]),
            adj_close: Number(_data["Adj Close"]),
          }
        );
        return newObj;
      })
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    stock["historicalData"] = updatedData;
    return stock;
  }
  return stock;
};
