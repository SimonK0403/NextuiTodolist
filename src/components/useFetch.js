import { useState, useEffect } from "react";

const useFetch = (path) => {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8080${path}`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return [data, setData]
}

export default useFetch