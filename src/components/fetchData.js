const fetchData = async (path, method = "GET", body) => {
  const response = fetch(`http://${window.location.hostname}:8080${path}`, {
    method: method,
    body: body ?? JSON.stringify(body),
  })
  const data = (await response).json()
  return data
}

export default fetchData