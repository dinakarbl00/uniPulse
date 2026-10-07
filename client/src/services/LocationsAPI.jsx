const API_URL = '/api/locations'

const getAllLocations = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Could not get locations')
  }

  return response.json()
}

const getLocationById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Could not get location')
  }

  return response.json()
}

export {
  getAllLocations,
  getLocationById
}

export default {
  getAllLocations,
  getLocationById
}