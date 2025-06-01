export interface Stops {
  stops: Stop[]
}

export interface Stop {
  coord: Coord;
  name: string;
}

export interface Coord {
  lat: number;
  lng: number;
}
