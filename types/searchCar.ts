export interface SearchCar {
  status?: string;
  result?: {
    route: Route;
  };
  message?: string;
}

export interface Route {
  distance: number;
  duration: number;
  sections: Section[];
  stops: Stop[];
}

export interface Section {
  distance: number;
  duration: number;
  shape: string;
}

export interface Stop {
  departure_times: string[];
  stay_time: number;
  stop: StopDetail;
}

export interface StopDetail {
  coord: Coord;
  name: string;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface SearchCarBody {
  "route-name"?: string;
  "start-time"?: string;
  stops?: StopDetail[]
}
