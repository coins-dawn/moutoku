'use client'

import { useStops } from "@/context/StopsContext";
import { usePathname, useRouter } from "next/navigation";
import { ForwardButton } from "@/components/Button";
import { getSearchCar } from "@/functions/fetchData";
import { useSearchCar, useSetSearchCar } from "@/context/SearchCarContext";
import { Stops } from "@/components/BusstopList";

const PanelPage = () => {
  const path = usePathname()
  const router = useRouter()
  const stops = useStops()
  const setSearchCar = useSetSearchCar()
  const searchCar = useSearchCar()

  const showConfirmBusStop = ["/"].includes(path)
  const dragDisabled = ["/plan", "/search"].includes(path)

  const handleClickConfirmBS = async () => {
    const body = {
      "route-name": "test",
      "start-time": "10:00",
      "stops": stops.map((stop) => ({
        name: stop.name,
        coord: {
          lat: stop.coord.lat,
          lon: stop.coord.lng
        }
      }))
    }
    const result = await getSearchCar(body, searchCar)
    if (result) {
      setSearchCar(result)
    }
    router.push('/plan')
  }

  return (<>
    <div className="h-[calc(100%-4.5rem)] overflow-y-scroll">
      <Stops dragDisabled={dragDisabled} />
    </div>
    {showConfirmBusStop && <ForwardButton
      handleClick={handleClickConfirmBS}
      text="バス経路確定" />}
  </>)
}

export default PanelPage
