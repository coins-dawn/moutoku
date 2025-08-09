import { SearchCar, SearchCarBody } from "@/types/searchCar"
import { SearchPtrans, SearchPtransBody } from "@/types/searchPtrans"

export const getSearchCar = async (body: SearchCarBody, searchCar: SearchCar) => {
  const currentBody = JSON.stringify(body)
  const previousBody = sessionStorage.getItem('searchCarBody')
  if (currentBody == previousBody && searchCar.status == "OK") {
    return null
  }
  else {
    const result = await postRequest("https://prometheus-h24i.onrender.com/search/car", body)
    sessionStorage.setItem('searchCarBody', currentBody)
    return result
  }
}

export const getSearchPtrans = async (body: SearchPtransBody, searchPtrans: SearchPtrans) => {
  const currentBody = JSON.stringify(body)
  const previousBody = sessionStorage.getItem('searchPtransBody')
  if (currentBody == previousBody && searchPtrans.status == "OK") {
    return null
  }
  else {
    const result = await postRequest("https://prometheus-h24i.onrender.com/search/ptrans", body)
    sessionStorage.setItem('searchPtransBody', currentBody)
    return result
  }
}

const postRequest = async (url: string, body: SearchCarBody | SearchPtransBody) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const message = errorData?.message || 'サーバーエラーが発生しました'
    throw new Error(message)
  }

  return response.json();
}