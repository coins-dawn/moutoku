import { SearchCar, SearchCarBody } from "@/types/searchCar"

export const getSearchCar = async (body: SearchCarBody, searchCar: SearchCar) => {
  const currentBody = JSON.stringify(body)
  const previousBody = sessionStorage.getItem('searchCarBody')
  if (currentBody == previousBody && searchCar.status == "OK") {
    return null
  }
  else {
    const result = await postSearchCar(body)
    sessionStorage.setItem('searchCarBody', currentBody)
    return result
  }
}

const postSearchCar = async (body: SearchCarBody) => {
  const response = await fetch("https://prometheus-h24i.onrender.com/search/car", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return response.json()
}
