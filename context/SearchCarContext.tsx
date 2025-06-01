'use client'

import { SearchCar } from "@/types/searchCar";
import { createContext, useContext, useState } from "react";

const SearchCarContext = createContext<SearchCar>({})
const SetSearchCarContext = createContext<React.Dispatch<React.SetStateAction<SearchCar>>>(() => { })

export const SearchCarProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [searchCar, setSearchCar] = useState<SearchCar | {}>({})

  return (
    <SearchCarContext value={searchCar}>
      <SetSearchCarContext value={setSearchCar}>
        {children}
      </SetSearchCarContext>
    </SearchCarContext>
  )
}

export const useSearchCar = () => useContext(SearchCarContext)
export const useSetSearchCar = () => useContext(SetSearchCarContext)
