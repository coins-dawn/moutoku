'use client'

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const CustomMap = dynamic(() =>
  import('@/components/Map').then(mod => mod.CustomMap), {
  ssr: false
});

const MarkerMap = dynamic(() =>
  import('@/components/Map').then(mod => mod.MarkerMap), {
  ssr: false
});

const PreviewMap = dynamic(() =>
  import('@/components/Map').then(mod => mod.PreviewMap), {
  ssr: false
});

const RouteMap = dynamic(() =>
  import('@/components/Map').then(mod => mod.RouteMap), {
  ssr: false
});

const RootPage = () => {
  const path = usePathname();

  const showMarker = ["/", "/route"].includes(path)
  const showPreview = ["/"].includes(path)
  const showRoute = ["/route"].includes(path)
  const editable = ["/"].includes(path)

  return (<>
    <CustomMap>
      {showMarker && <MarkerMap editable={editable} />}
      {showPreview && <PreviewMap />}
      {showRoute && <RouteMap />}
    </CustomMap >
  </>)
}

export default RootPage
