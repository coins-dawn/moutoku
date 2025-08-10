'use client'

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<boolean>(false)
const SetLoadingContext = createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => { })

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <LoadingContext value={loading}>
      <SetLoadingContext value={setLoading}>
        {children}
      </SetLoadingContext>
    </LoadingContext>
  )
}

export const useLoading = () => useContext(LoadingContext)
export const useSetLoading = () => useContext(SetLoadingContext)
