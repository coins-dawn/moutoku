'use client'

import { SearchPtrans } from "@/types/searchPtrans";
import { createContext, useContext, useState } from "react";

const SearchPtransContext = createContext<SearchPtrans>({})
const SetSearchPtransContext = createContext<React.Dispatch<React.SetStateAction<SearchPtrans>>>(() => { })

export const SearchPtransProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [SearchPtrans, setSearchPtrans] = useState<SearchPtrans>({})

  return (
    <SearchPtransContext value={SearchPtrans}>
      <SetSearchPtransContext value={setSearchPtrans}>
        {children}
      </SetSearchPtransContext>
    </SearchPtransContext>
  )
}

export const useSearchPtrans = () => useContext(SearchPtransContext)
export const useSetSearchPtrans = () => useContext(SetSearchPtransContext)
