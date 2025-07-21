export interface StartGoal {
  type: string;
  coord: Coord;
}

export interface Coord {
  lat: number;
  lng: number;
}
