import fetch from 'node-fetch'

const { API, API_KEY } = process.env

export const allScreenShots = (id) => {
  const allScreenShots = fetch(`${API}games/${id}/screenshots?${API_KEY}`)
    .then(response => response.json())
  return allScreenShots
}
