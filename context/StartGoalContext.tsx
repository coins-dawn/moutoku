'use client'

import { StartGoal } from "@/types/startGoal";
import { createContext, useContext, useState } from "react";

const StartGoalContext = createContext<StartGoal[]>([])
const SetStartGoalContext = createContext<React.Dispatch<React.SetStateAction<StartGoal[]>>>(() => { })

export const StartGoalProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [startGoal, setStartGoal] = useState<StartGoal[]>([])

  return (
    <StartGoalContext value={startGoal}>
      <SetStartGoalContext value={setStartGoal}>
        {children}
      </SetStartGoalContext>
    </StartGoalContext>
  )
}

export const useStartGoal = () => useContext(StartGoalContext)
export const useSetStartGoal = () => useContext(SetStartGoalContext)
