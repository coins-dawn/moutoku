"use client"

import { useLeafletMap } from "../hooks/useLeafletMap"
import "leaflet/dist/leaflet.css"

export const Map = () => {
  const mapRef = useLeafletMap([36.6959, 137.2136])

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
    </>
  )
}