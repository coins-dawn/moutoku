'use client'

import { SearchCarBody } from "@/types/searchCar";
import { createContext, useContext, useState } from "react";

const SearchCarBodyContext = createContext<SearchCarBody>({})
const SetSearchCarBodyContext = createContext<React.Dispatch<React.SetStateAction<SearchCarBody>>>(() => { })

export const SearchCarBodyProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [searchCarBody, setSearchCarBody] = useState<SearchCarBody | {}>({})

  return (
    <SearchCarBodyContext value={searchCarBody}>
      <SetSearchCarBodyContext value={setSearchCarBody}>
        {children}
      </SetSearchCarBodyContext>
    </SearchCarBodyContext>
  )
}

export const useSearchCarBody = () => useContext(SearchCarBodyContext)
export const useSetSearchCarBody = () => useContext(SetSearchCarBodyContext)
