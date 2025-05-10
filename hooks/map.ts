"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const useLeafletMap = (center: [number, number]) => {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window !== "undefined" && mapRef.current) {
            const map = L.map(mapRef.current).setView(center, 12)

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map)

            return () => {
                map.remove()
            }
        }
    }, [center])

    return mapRef
}

export { useLeafletMap }
