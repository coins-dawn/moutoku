'use client'

import dynamic from "next/dynamic";

const CustomMap = dynamic(() =>
  import('@/components/Map').then(mod => mod.CustomMap),
  { loading: () => <p>ロード中</p>, ssr: false }
);

const RootPage = () => {

  return (
    <CustomMap />
  )
}

export default RootPage
