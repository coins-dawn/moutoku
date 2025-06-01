'use client'

import { useGetInitialStops } from "@/hooks/data";
import { Stop } from "@/types/stops";
import { createContext, useContext, useState } from "react";

const StopsContext = createContext<Stop[]>([])
const SetStopsContext = createContext<React.Dispatch<React.SetStateAction<Stop[]>>>(() => {})

export const StopsProvider = ({ children }: { children: React.ReactNode }) => {
  const initialStops = useGetInitialStops()
  const [stops, setStops] = useState<Stop[]>(initialStops.stops)

  return (
    <StopsContext value={stops}>
      <SetStopsContext value={setStops}>
        {children}
      </SetStopsContext>
    </StopsContext>
  )
}

export const useStops = () => useContext(StopsContext)
export const useSetStops = () => useContext(SetStopsContext)
