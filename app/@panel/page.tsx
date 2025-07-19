'use client'

import { useStops } from "@/context/StopsContext";
import { usePathname, useRouter } from "next/navigation";
import { OneButton, TwoButtons } from "@/components/Button";
import { getSearchCar } from "@/functions/fetchData";
import { useSearchCar, useSetSearchCar } from "@/context/SearchCarContext";
import { Stops } from "@/components/Panel";

const PanelPage = () => {
  const path = usePathname()
  const router = useRouter()
  const stops = useStops()
  const setSearchCar = useSetSearchCar()
  const searchCar = useSearchCar()

  const showConcirmBusStop = ["/"].includes(path)
  const showBackRoot = ["/route"].includes(path)
  const dragDisabled = ["/route"].includes(path)

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
    router.push('/route')
  }

  const handleClickBackRoot = () => {
    router.push('/')
  }

  const handleClickStartSimulation = () => {

  }

  return (<>
    <Stops dragDisabled={dragDisabled} />
    {showConcirmBusStop && <OneButton
      handleClick={handleClickConfirmBS}
      text="バス経路確定" />}
    {showBackRoot && <TwoButtons
      handleClickBack={handleClickBackRoot}
      textBack="バス停を見直す"
      handleClickForward={handleClickStartSimulation}
      textForward="経路探索開始" />}
  </>)
}

export default PanelPage
