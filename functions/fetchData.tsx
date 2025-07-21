import { SearchCar, SearchCarBody } from "@/types/searchCar"
import { SearchPtrans, SearchPtransBody } from "@/types/searchPtrans"

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

export const getSearchPtrans = async (body: SearchPtransBody, searchPtrans: SearchPtrans) => {
  const currentBody = JSON.stringify(body)
  const previousBody = sessionStorage.getItem('searchPtransBody')
  if (currentBody == previousBody && searchPtrans.status == "OK") {
    return null
  }
  else {
    const result = await postSearchPtrans(body)
    sessionStorage.setItem('searchPtransBody', currentBody)
    return result
  }
}

const postSearchPtrans = async (body: SearchPtransBody) => {
  const response = await fetch("https://prometheus-h24i.onrender.com/search/ptrans", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return response.json()
}