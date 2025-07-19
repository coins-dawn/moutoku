import { Coord } from "@/types/stops";

export const coordToId = (coord: Coord): string => {
  return JSON.stringify(coord)
}

export const idToCoord = (id: string): Coord => {
  return JSON.parse(id)
}