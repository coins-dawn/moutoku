'use client'

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useSearchCar } from "@/hooks/api"

const Page = () => {
  const MakerMap = useMemo(() =>
    dynamic(() =>
      import('@/components/Map').then(mod => mod.MakerMap),
      {
        loading: () => <p>ロード中</p>,
        ssr: false
      }
    ),
    []
  )

  const searchCar = useSearchCar()

  return (
    <div className="w-full h-[100vh]">
      <MakerMap searchCar={searchCar.response} posix={[36.663746, 137.21158200000002]} />
    </div>
  )
}

export default Page