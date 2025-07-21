'use client'

import { BackButton, TwoButtons } from "@/components/Button"
import { useSearchCar } from "@/context/SearchCarContext"
import { useSearchPtrans, useSetSearchPtrans } from "@/context/SearchPtransContext"
import { useStartGoal } from "@/context/StartGoalContext"
import { getSearchPtrans } from "@/functions/fetchData"
import { usePathname, useRouter } from "next/navigation"


const RoutePage = () => {
  const searchCar = useSearchCar()
  const searchPtrans = useSearchPtrans()
  const setSearchPtrans = useSetSearchPtrans()
  const startGoal = useStartGoal()
  const router = useRouter()
  const path = usePathname()
  const open = ["/plan", "/search"].includes(path)
  const showSimulation = ["/plan"].includes(path)
  const showBack = ["/search"].includes(path)
  const handleClickBackRoot = () => {
    router.push('/')
  }

  const handleClickStartSimulation = async () => {
    const start = startGoal.find(({ type }) => type == "start")
    const goal = startGoal.find(({ type }) => type == "goal")
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
        route: searchCar.result.route
      }
    }
    const result = await getSearchPtrans(body, searchPtrans)
    if (result) {
      setSearchPtrans(result)
    }
    router.push('/search')
  }

  return open ? (<>
    <div className="fixed w-80 left-80 top-0 h-[calc(100vh-2rem)] bg-white opacity-95 m-4 z-[1000] p-2">
      {showSimulation && <>
        <div>出発地</div>
        <div>到着地</div>
        <div>出発時間</div>
        <TwoButtons
          handleClickBack={handleClickBackRoot}
          textBack="バス停を見直す"
          handleClickForward={handleClickStartSimulation}
          textForward="経路探索開始"
        />
      </>}
      {showBack && <>
        <div>出発時間{searchPtrans.result?.route.start_time}</div>
        <div>到着時間{searchPtrans.result?.route.goal_time}</div>
        <div>所要時間{searchPtrans.result?.route.duration}分</div>
        <div className="mt-4">
          {searchPtrans.result?.route.spots.map((spot, index) => {
            const prevSection = searchPtrans.result?.route.sections[index - 1]
            const section = searchPtrans.result?.route.sections[index]
            return (
              <div key={index}>
                <div>
                  <span>
                    {prevSection && <span>{prevSection.goal_time}</span>}
                    <span>{section?.start_time}</span>
                  </span>
                  <span>{spot.name}</span>
                </div>
                {section && <>
                  <span>↓</span>
                  <span>{section.type}</span>
                  <span>{section.duration}分</span>
                </>}
              </div>
            )
          })}
        </div>
        <BackButton
          handleClick={() => router.push("/plan")}
          text="条件を変更する"
        />
      </>}
    </div>
  </>) : null
}

export default RoutePage