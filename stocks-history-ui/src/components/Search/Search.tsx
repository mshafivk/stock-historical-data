import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { stock, _searchItem } from "../../models/models";
import { getUrl, http } from "../../utils/utils";

import { SEARCH_RESPONSE, SET_SELECTED_STOCK } from "../../reducers/actions";
import "./search.scss";
import searchIcon from "../../images/search.svg";
import { useAppContext } from "../../AppContext";

export const Search: FunctionComponent<{}> = () => {
  const { state, dispatch } = useAppContext();
  const [visible, setVisible] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");

  const searchStocks = async (searchTerm: string) => {
    const apiUrl = getUrl();
    const response = await http<{ data: _searchItem[] }>(
      apiUrl + "search?term=" + searchTerm
    );
    return dispatch({ type: SEARCH_RESPONSE, payload: response.data || [] });
  };

  const selectStock = async (selectedItem: string) => {
    const apiUrl = getUrl();
    const response = await http<{ data: stock }>(
      apiUrl + "getStock/" + selectedItem
    );
    return dispatch({ type: SET_SELECTED_STOCK, payload: response.data || [] });
  };

  const { searchedList, selectedStock } = state;

  useEffect(() => {
    setVisible(searchedList.length > 0);
  }, [searchedList]);

  useEffect(() => {
    setSearchedValue(selectedStock?.name || "");
  }, [selectedStock]);

  return (
    <div className="search-container">
      <form className="form-inline">
        <div className="input-group flex-fill mx-auto">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchedValue(e.target.value);
              searchStocks(e.target.value);
            }}
            value={searchedValue}
          />
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
        </div>
      </form>
      {
        <ul
          className={`dropdown-menu search-result ${
            visible && "search-visible"
          }`}
        >
          {searchedList.length > 0 &&
            searchedList.map(({ _id, name }) => (
              <li key={_id}>
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(false);
                    selectStock(_id);
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
        </ul>
      }
    </div>
  );
};
