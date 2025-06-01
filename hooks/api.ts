import { useState, useEffect } from 'react';
import { SearchCarBody } from '@/types/searchCar'
import { useSearchCarBody, useSetSearchCarBody } from '@/context/SearchCarBodyContext';
import { useSetSearchCar } from '@/context/SearchCarContext';

const isBodyEqual = (body: SearchCarBody, prevBody: SearchCarBody) => {
  const isRouteNameEqual = body['route-name'] == prevBody['route-name'];
  const isStartTimeEqual = body['start-time'] == prevBody['start-time'];
  const isStopsEqual = JSON.stringify(body.stops) === JSON.stringify(prevBody.stops);
  return isRouteNameEqual && isStartTimeEqual && isStopsEqual;
}


export const getSearchCar = (body: SearchCarBody) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);
  const prevBody = useSearchCarBody()
  const setSearchCarBody = useSetSearchCarBody()
  const setSearchCar = useSetSearchCar();

  const shouldFetch = !isBodyEqual(body, prevBody);

  console.log(shouldFetch? "fetch fetch fetch!!!" : "no")
  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchSearchCar = async () => {
      try {
        const response = await fetch("https://prometheus-h24i.onrender.com/search/car", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json()
        setSearchCar(data);
        setSearchCarBody(body)

      }
      catch (error) {
        console.log("error", error)
        setError(error)
      }
    }

    if (shouldFetch) {
      fetchSearchCar()
    }

    setLoading(false);
  }, []);

  return { loading, error };
};