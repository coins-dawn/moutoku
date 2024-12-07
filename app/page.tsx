"use client"

import dynamic from "next/dynamic"

const Page = () => {
  const Map = dynamic(() => import("./components/Map").then((mod) => mod.Map), { ssr: false })
  return (
    <>
      <div className="px-3">
        <div className="flex justify-center text-3xl font-semibold text-[rgba(0,164,150,1)] m-5">Leafletアプリ</div>
        <Map />
      </div>
    </>
  )
}

export default Page