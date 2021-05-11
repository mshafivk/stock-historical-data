export interface historicalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_close: number;
}

export interface stock {
  name: string;
  historicalData: historicalData[];
}

export interface _searchItem {
  _id: string;
  name: string;
}
