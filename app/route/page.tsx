'use client'

import { useStops } from "@/context/StopsContext"
import { getSearchCar } from "@/hooks/api"

const RoutePage = () => {
  const stops = useStops()
  console.log("routttttttteeeee", new Date().toISOString())
  const { loading, error } = getSearchCar({
    "route-name": "test",
    "start-time": "10:00",
    stops: stops.map((stop) => ({
      name: stop.name,
      coord: {
        lat: stop.coord.lat,
        lon: stop.coord.lng
      }
    }))
  })

  // if (loading) {
  //   return <div>Loading...</div>
  // }
  // else if (error) {
  //   return <div>Error: {error}</div>
  // }
  // else {
  //   return null
  // }

  return null
}

export default RoutePage