'use client'

import { BackButton, TwoButtons } from "@/components/Button"
import { useLoading, useSetLoading } from "@/context/LoadingContext"
import { useSearchCar } from "@/context/SearchCarContext"
import { useSearchPtrans, useSetSearchPtrans } from "@/context/SearchPtransContext"
import { useStartGoal } from "@/context/StartGoalContext"
import { getSearchPtrans } from "@/functions/fetchData"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const getTransportation = (type: string) => {
  const transportation = transportations.find(t => t.type == type)
  return transportation ? transportation.name : type
}
const transportations = [
  {
    type: "bus",
    name: "バス"
  },
  {
    type: "walk",
    name: "徒歩"
  }
]

const RoutePage = () => {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const searchCar = useSearchCar()
  const searchPtrans = useSearchPtrans()
  const setSearchPtrans = useSetSearchPtrans()
  const startGoal = useStartGoal()
  const router = useRouter()
  const path = usePathname()
  const open = ["/plan", "/search"].includes(path)
  const showSimulation = ["/plan"].includes(path)
  const showBack = ["/search"].includes(path)
  const setLoading = useSetLoading()
  const handleClickBackRoot = () => {
    router.push('/')
  }

  const handleClickStartSimulation = async () => {
    const start = startGoal.find(({ type }) => type == "start")
    const goal = startGoal.find(({ type }) => type == "goal")

    if (!start && !goal) {
      setError(true)
      setMessage("出発地点と到着地点を指定してください")
      return
    }
    if (!start) {
      setError(true)
      setMessage("出発地点を指定してください")
      return
    }
    if (!goal) {
      setError(true)
      setMessage("到着地点を指定してください")
      return
    }
    setLoading(true)

    const body = {
      start: {
        lat: start.coord.lat,
        lon: start.coord.lng
      },
      goal: {
        lat: goal.coord.lat,
        lon: goal.coord.lng
      },
      "start-time": "10:00",
      "car-output": {
        route: searchCar.result!.route
      }
    }
    try {
      const result = await getSearchPtrans(body, searchPtrans)
      if (result) {
        setError(false)
        setMessage("")
        setSearchPtrans(result)
      }
      setLoading(false)
      router.push('/search')
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

  return open ? (<>
    <div className="fixed w-80 left-80 top-0 h-[calc(100vh-2rem)] bg-white opacity-95 m-4 z-[1000] p-2">
      {showSimulation && <>
        <div>出発地</div>
        <div>到着地</div>
        <div>出発時間</div>
        {error && <div className="text-red-500">{message}</div>}
        <TwoButtons
          handleClickBack={handleClickBackRoot}
          textBack="バス停を見直す"
          handleClickForward={handleClickStartSimulation}
          textForward="経路探索開始"
        />
      </>}
      {showBack &&
        <div className="h-[calc(100%-4rem)] overflow-y-scroll">
          <div>出発時間{searchPtrans.result?.route.start_time}</div>
          <div>到着時間{searchPtrans.result?.route.goal_time}</div>
          <div>所要時間{searchPtrans.result?.route.duration}分</div>
          <div className="mt-4">
            {searchPtrans.result?.route.spots.map((spot, index) => {
              const prevSection = searchPtrans.result?.route.sections[index - 1]
              const section = searchPtrans.result?.route.sections[index]
              return (
                <div key={index}>
                  <div className="flex flex-row items-center border border-solid border-black p-2">
                    <div className="flex flex-col basis-20">
                      {prevSection && <span>{prevSection.goal_time}着</span>}
                      {section && <span>{section.start_time}発</span>}
                    </div>
                    <span>{spot.name}</span>
                  </div>
                  {section &&
                    <div className="pl-4 my-2">
                      <span></span>
                      <span>{getTransportation(section.type)}</span>
                      <span>{section.duration}分</span>
                    </div>
                  }
                </div>
              )
            })}
          </div>
          <BackButton
            handleClick={() => router.push("/plan")}
            text="条件を変更する"
          />
        </div>}
    </div>
  </>) : null
}

export default RoutePage