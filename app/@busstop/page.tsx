'use client'

import { useStops } from "@/context/StopsContext";
import { usePathname, useRouter } from "next/navigation";
import { ForwardButton } from "@/components/Button";
import { getSearchCar } from "@/functions/fetchData";
import { useSearchCar, useSetSearchCar } from "@/context/SearchCarContext";
import { Stops } from "@/components/BusstopList";
import { useState } from "react";
import { useSetLoading } from "@/context/LoadingContext";

const PanelPage = () => {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const path = usePathname()
  const router = useRouter()
  const stops = useStops()
  const setSearchCar = useSetSearchCar()
  const searchCar = useSearchCar()
  const setLoading = useSetLoading()
  const showConfirmBusStop = ["/"].includes(path)
  const dragDisabled = ["/plan", "/search"].includes(path)

  const handleClickConfirmBS = async () => {
    setLoading(true)
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
    try {
      const result = await getSearchCar(body, searchCar)
      if (result) {
        setError(false)
        setMessage("")
        setSearchCar(result)
      }
      setLoading(false)
      router.push('/plan')
    }
    catch (e) {
      setError(true)
      if (e instanceof Error) {
        setMessage(e.message)
      }
      else {
        setMessage("システムエラーが発生しました。お手数おかけしますがやり直してください")
      }
      setLoading(false)
    }
  }
  return (<>
    <div className="h-[calc(100%-4.5rem)] overflow-y-scroll">
      <Stops dragDisabled={dragDisabled} />
      {error && <div className="text-red-500 p-2">{message}</div>}
    </div>
    {showConfirmBusStop && <ForwardButton
      handleClick={handleClickConfirmBS}
      text="バス経路確定" />}
  </>)
}

export default PanelPage
