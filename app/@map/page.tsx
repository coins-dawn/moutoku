'use client'

import { SearchMarkers, SearchPolyline } from "@/components/Map";
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

const PlanMap = dynamic(() =>
  import('@/components/Map').then(mod => mod.PlanMap), {
  ssr: false
});

const SearchMarkers = dynamic(() =>
  import('@/components/Map').then(mod => mod.SearchMarkers), {
  ssr: false
});

const SearchPolyline = dynamic(() =>
  import('@/components/Map').then(mod => mod.SearchPolyline), {
  ssr: false
});

const RootPage = () => {
  const path = usePathname();

  const showMarker = ["/", "/plan"].includes(path)
  const showPreview = ["/"].includes(path)
  const showRoute = ["/plan"].includes(path)
  const showSimulation = ["/plan"].includes(path)
  const editable = ["/"].includes(path)
  const showSearchMarker = ["/search"].includes(path)
  const showSearchPolyline = ["/search"].includes(path)

  return (<>
    <CustomMap>
      {showMarker && <MarkerMap editable={editable} />}
      {showSimulation && <PlanMap />}
      {showPreview && <PreviewMap />}
      {showRoute && <RouteMap />}
      {showSearchMarker && <SearchMarkers />}
      {showSearchPolyline && <SearchPolyline />}
    </CustomMap >
  </>)
}

export default RootPage
