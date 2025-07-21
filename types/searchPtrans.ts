import { Route as SCRoute } from "@/types/searchCar"

export interface SearchPtrans {
  status?: string;
  result?: {
    route: Route;
  };
  message?: string;
}

export interface Route {
  duration: number;
  goal_time: string;
  sections: Section[];
  spots: Spot[];
  start_time: string;
}

export interface Section {
  duration: number;
  goal_time: string;
  name: string;
  shape: string;
  start_time: string;
  type: string
}

export interface Spot {
  coord: Coord;
  name: string;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface SearchPtransBody {
  start: Coord;
  goal: Coord;
  "start-time": string;
  "car-output": SCRoute
}
