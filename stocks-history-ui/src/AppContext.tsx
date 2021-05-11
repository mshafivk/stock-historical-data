import React from "react";
import { IAction, IState } from "./reducers/stockReducer";

const AppContext = React.createContext({} as IContextProps);

interface IContextProps {
  state: IState;
  dispatch: ({ type }: IAction) => void;
}
export const useAppContext = (): IContextProps => React.useContext(AppContext);

export default AppContext;
