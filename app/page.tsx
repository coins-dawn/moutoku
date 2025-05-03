'use client'

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Page = () => {
  const Map = useMemo(() =>
    dynamic(() =>
      import('@/app/components/Map'),
      {
        loading: () => <p>ロード中</p>,
        ssr: false
      }
    ),
    []
  )

  return (
    <div className="w-full h-[100vh]">
      <Map posix={[36.6959, 137.2136]} />
    </div>
  )
}

export default Page